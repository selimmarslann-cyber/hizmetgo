# PowerShell script to clear DATABASE_URL from Windows User/Machine environment variables
# This fixes the issue where OS-level DATABASE_URL overrides .env file

Write-Host "🔧 Clearing DATABASE_URL from Windows environment variables..." -ForegroundColor Cyan
Write-Host ""

# Check User-level environment variable
$userEnv = [System.Environment]::GetEnvironmentVariable('DATABASE_URL', 'User')
if ($userEnv) {
    Write-Host "⚠️  Found DATABASE_URL in User environment: $($userEnv.Substring(0, [Math]::Min(50, $userEnv.Length)))..." -ForegroundColor Yellow
    if ($userEnv -like '*file:*dev.db*') {
        Write-Host "   ❌ This contains file:./dev.db - removing it..." -ForegroundColor Red
        [System.Environment]::SetEnvironmentVariable('DATABASE_URL', $null, 'User')
        Write-Host "   ✅ Removed DATABASE_URL from User environment" -ForegroundColor Green
    } else {
        Write-Host "   ℹ️  Value looks correct (PostgreSQL URL), but removing anyway to use .env file" -ForegroundColor Yellow
        [System.Environment]::SetEnvironmentVariable('DATABASE_URL', $null, 'User')
        Write-Host "   ✅ Removed DATABASE_URL from User environment" -ForegroundColor Green
    }
} else {
    Write-Host "✅ No DATABASE_URL found in User environment" -ForegroundColor Green
}

Write-Host ""

# Check Machine-level environment variable (requires admin)
$machineEnv = [System.Environment]::GetEnvironmentVariable('DATABASE_URL', 'Machine')
if ($machineEnv) {
    Write-Host "⚠️  Found DATABASE_URL in Machine environment: $($machineEnv.Substring(0, [Math]::Min(50, $machineEnv.Length)))..." -ForegroundColor Yellow
    Write-Host "   ⚠️  Removing Machine-level variables requires Administrator privileges" -ForegroundColor Yellow
    
    $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    if ($isAdmin) {
        if ($machineEnv -like '*file:*dev.db*') {
            Write-Host "   ❌ This contains file:./dev.db - removing it..." -ForegroundColor Red
            [System.Environment]::SetEnvironmentVariable('DATABASE_URL', $null, 'Machine')
            Write-Host "   ✅ Removed DATABASE_URL from Machine environment" -ForegroundColor Green
        } else {
            Write-Host "   ℹ️  Value looks correct (PostgreSQL URL), but removing anyway to use .env file" -ForegroundColor Yellow
            [System.Environment]::SetEnvironmentVariable('DATABASE_URL', $null, 'Machine')
            Write-Host "   ✅ Removed DATABASE_URL from Machine environment" -ForegroundColor Green
        }
    } else {
        Write-Host "   ⚠️  Not running as Administrator. Skipping Machine-level removal." -ForegroundColor Yellow
        Write-Host "   💡 To remove Machine-level variable, run PowerShell as Administrator and run this script again" -ForegroundColor Cyan
    }
} else {
    Write-Host "✅ No DATABASE_URL found in Machine environment" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Done! DATABASE_URL has been cleared from Windows environment variables." -ForegroundColor Green
Write-Host ""
Write-Host "📝 IMPORTANT: You must restart your terminal/PowerShell for changes to take effect!" -ForegroundColor Yellow
Write-Host "   After restarting, run: npm run dev" -ForegroundColor Cyan
Write-Host ""

