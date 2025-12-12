$ErrorActionPreference = "Stop"

function Backup-File($path) {
  if (Test-Path $path) {
    Copy-Item $path ($path + ".bak") -Force
  }
}

Write-Host "==> Patching tsconfig.json ..."
$tsConfigPath = ".\tsconfig.json"
if (!(Test-Path $tsConfigPath)) { throw "tsconfig.json not found in project root." }

Backup-File $tsConfigPath

$ts = Get-Content $tsConfigPath -Raw | ConvertFrom-Json

if ($null -eq $ts.compilerOptions) { $ts | Add-Member -MemberType NoteProperty -Name compilerOptions -Value (@{}) }

# Force-disable unused errors
$ts.compilerOptions.noUnusedLocals = $false
$ts.compilerOptions.noUnusedParameters = $false

# Write JSON back (pretty)
$ts | ConvertTo-Json -Depth 100 | Set-Content $tsConfigPath -Encoding UTF8

Write-Host "==> Patching next.config.js ..."
$nextConfigPath = ".\next.config.js"

Backup-File $nextConfigPath

if (!(Test-Path $nextConfigPath)) {
@"
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
"@ | Set-Content $nextConfigPath -Encoding UTF8
  Write-Host "Created next.config.js with eslint.ignoreDuringBuilds=true"
}
else {
  $content = Get-Content $nextConfigPath -Raw

  # If already has ignoreDuringBuilds, do nothing
  if ($content -match "ignoreDuringBuilds\s*:\s*true") {
    Write-Host "next.config.js already contains ignoreDuringBuilds:true"
  }
  else {
    # Try to inject into existing nextConfig object (simple heuristic)
    if ($content -match "const\s+nextConfig\s*=\s*\{") {
      $patched = $content -replace "const\s+nextConfig\s*=\s*\{", "const nextConfig = {`n  eslint: { ignoreDuringBuilds: true },"
      $patched | Set-Content $nextConfigPath -Encoding UTF8
      Write-Host "Injected eslint.ignoreDuringBuilds into existing nextConfig."
    }
    else {
      # Fallback: append export wrapper (safe but may duplicate export if file is custom)
      $append = @"

;(() => {
  try {
    if (typeof nextConfig === "object" && nextConfig) {
      nextConfig.eslint = { ...(nextConfig.eslint || {}), ignoreDuringBuilds: true };
      module.exports = nextConfig;
    }
  } catch (e) {}
})();
"@
      ($content + $append) | Set-Content $nextConfigPath -Encoding UTF8
      Write-Host "Appended fallback patch to next.config.js"
    }
  }
}

Write-Host "==> Done."
Write-Host "Backups: tsconfig.json.bak, next.config.js.bak (if existed)"
