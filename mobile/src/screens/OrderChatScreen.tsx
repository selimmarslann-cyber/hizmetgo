import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import { useAppState } from "../store/AppStateContext";
import { fetchOrderMessages, sendMessage } from "../api/messages";
import type { Message } from "../api/messages";

export default function OrderChatScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = (route.params as any) || {};
  const { currentUser, authToken } = useAppState();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [order, setOrder] = useState<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const loadMessages = useCallback(async () => {
    if (!authToken || !orderId) return;

    try {
      setLoading(true);
      const response = await fetchOrderMessages(orderId, authToken);
      setMessages(response.messages || []);

      // Load order details (optional, can be added later)
      // For now, we'll just use orderId
    } catch (error: any) {
      console.error("Messages load error:", error);
      Alert.alert("Hata", "Mesajlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [authToken, orderId]);

  useEffect(() => {
    loadMessages();

    // Poll for new messages every 3 seconds (simple polling, real-time can be added later)
    const interval = setInterval(() => {
      loadMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [loadMessages]);

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendMessage = async () => {
    if ((!messageContent.trim() || sending) && !authToken) return;

    const content = messageContent.trim();
    if (!content) return;

    setMessageContent("");
    setSending(true);

    try {
      await sendMessage(orderId, { content }, authToken!);
      // Reload messages to get the new one
      loadMessages();
    } catch (error: any) {
      console.error("Send message error:", error);
      Alert.alert("Hata", "Mesaj gönderilemedi");
      setMessageContent(content); // Restore on error
    } finally {
      setSending(false);
    }
  };

  if (!currentUser || !authToken) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sohbet</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons
            name="chatbubbles-outline"
            size={64}
            color={colors.textMuted}
          />
          <Text style={styles.emptyTitle}>Giriş Yapmalısınız</Text>
          <Text style={styles.emptyText}>
            Mesajlaşmak için giriş yapmalısınız
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const otherUser =
    messages.length > 0
      ? messages[0].senderId === currentUser.id
        ? messages[0].receiver
        : messages[0].sender
      : null;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          {otherUser?.avatarUrl ? (
            <Image
              source={{ uri: otherUser.avatarUrl }}
              style={styles.headerAvatar}
              accessibilityLabel={otherUser.name || "Kullanıcı avatarı"}
            />
          ) : (
            <View style={styles.headerAvatarPlaceholder}>
              <Ionicons name="person" size={20} color={colors.textMuted} />
            </View>
          )}
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              {otherUser?.name || "Kullanıcı"}
            </Text>
            <Text style={styles.headerSubtitle}>
              Sipariş #{orderId?.slice(-8).toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Yükleniyor...</Text>
            </View>
          ) : messages.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="chatbubbles-outline"
                size={48}
                color={colors.textMuted}
              />
              <Text style={styles.emptyText}>Henüz mesaj yok</Text>
              <Text style={styles.emptySubtext}>İlk mesajı siz gönderin!</Text>
            </View>
          ) : (
            <>
              {order && (
                <View style={styles.systemMessage}>
                  <Text style={styles.systemMessageText}>
                    Sipariş oluşturuldu •{" "}
                    {new Date(order.createdAt).toLocaleString("tr-TR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              )}
              {messages.map((message, index) => {
                const isMyMessage = message.senderId === currentUser.id;
                const prevMessage = index > 0 ? messages[index - 1] : null;
                const showDateSeparator =
                  !prevMessage ||
                  new Date(message.createdAt).toDateString() !==
                    new Date(prevMessage.createdAt).toDateString();

                const messageDate = new Date(message.createdAt);
                const isToday =
                  messageDate.toDateString() === new Date().toDateString();

                return (
                  <View key={message.id}>
                    {/* Date Separator */}
                    {showDateSeparator && (
                      <View style={styles.dateSeparator}>
                        <View style={styles.dateSeparatorLine} />
                        <Text style={styles.dateSeparatorText}>
                          {isToday
                            ? "Bugün"
                            : messageDate.toLocaleDateString("tr-TR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                        </Text>
                        <View style={styles.dateSeparatorLine} />
                      </View>
                    )}

                    {/* Message Bubble */}
                    <View
                      style={[
                        styles.messageRow,
                        isMyMessage && styles.messageRowRight,
                      ]}
                    >
                      {!isMyMessage && (
                        <View style={styles.avatarContainer}>
                          {message.sender.avatarUrl ? (
                            <Image
                              source={{ uri: message.sender.avatarUrl }}
                              style={styles.avatar}
                              accessibilityLabel={
                                message.sender.name || "Gönderen avatarı"
                              }
                            />
                          ) : (
                            <View style={styles.avatarPlaceholder}>
                              <Ionicons
                                name="person"
                                size={16}
                                color={colors.textMuted}
                              />
                            </View>
                          )}
                        </View>
                      )}
                      <View
                        style={[
                          styles.messageBubble,
                          isMyMessage
                            ? styles.messageBubbleRight
                            : styles.messageBubbleLeft,
                        ]}
                      >
                        {!isMyMessage && message.sender && (
                          <Text style={styles.messageSenderName}>
                            {message.sender.name}
                          </Text>
                        )}
                        {message.content && (
                          <Text
                            style={[
                              styles.messageText,
                              isMyMessage && styles.messageTextRight,
                            ]}
                          >
                            {message.content}
                          </Text>
                        )}
                        {message.fileUrl && (
                          <View style={styles.fileContainer}>
                            <Ionicons
                              name="document-outline"
                              size={20}
                              color={
                                isMyMessage ? colors.cardBg : colors.primary
                              }
                            />
                            <Text
                              style={[
                                styles.fileName,
                                isMyMessage && styles.fileNameRight,
                              ]}
                              numberOfLines={1}
                            >
                              {message.fileName || "Dosya"}
                            </Text>
                          </View>
                        )}
                        <View style={styles.messageFooter}>
                          <Text
                            style={[
                              styles.messageTime,
                              isMyMessage && styles.messageTimeRight,
                            ]}
                          >
                            {messageDate.toLocaleTimeString("tr-TR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Text>
                          {isMyMessage && message.isRead && (
                            <Ionicons
                              name="checkmark-done"
                              size={14}
                              color={colors.cardBg}
                              style={styles.readIcon}
                            />
                          )}
                        </View>
                      </View>
                      {isMyMessage && (
                        <View style={styles.avatarContainer}>
                          {currentUser.avatarUrl ? (
                            <Image
                              source={{ uri: currentUser.avatarUrl }}
                              style={styles.avatar}
                              accessibilityLabel={
                                currentUser.name || "Kullanıcı avatarı"
                              }
                            />
                          ) : (
                            <View style={styles.avatarPlaceholder}>
                              <Ionicons
                                name="person"
                                size={16}
                                color={colors.textMuted}
                              />
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Mesaj yazın..."
              placeholderTextColor={colors.textMuted}
              value={messageContent}
              onChangeText={setMessageContent}
              multiline
              maxLength={1000}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!messageContent.trim() || sending) &&
                  styles.sendButtonDisabled,
              ]}
              onPress={handleSendMessage}
              disabled={!messageContent.trim() || sending}
            >
              {sending ? (
                <View style={styles.spinner} />
              ) : (
                <Ionicons
                  name="send"
                  size={20}
                  color={
                    messageContent.trim() && !sending
                      ? colors.cardBg
                      : colors.textMuted
                  }
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginLeft: spacing.sm,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    ...typography.h3,
    fontSize: 16,
    color: colors.textDark,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: colors.textMuted,
  },
  emptyContainer: {
    padding: spacing.xl * 2,
    alignItems: "center",
  },
  emptyText: {
    ...typography.h3,
    fontSize: 16,
    color: colors.textDark,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
  },
  systemMessage: {
    alignItems: "center",
    marginVertical: spacing.md,
  },
  systemMessageText: {
    fontSize: 12,
    color: colors.textMuted,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  dateSeparator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.md,
    gap: spacing.sm,
  },
  dateSeparatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dateSeparatorText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: "500",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  messageRowRight: {
    justifyContent: "flex-end",
  },
  avatarContainer: {
    width: 32,
    height: 32,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  messageBubble: {
    maxWidth: "75%",
    padding: spacing.md,
    borderRadius: 16,
  },
  messageBubbleLeft: {
    backgroundColor: colors.cardBg,
    borderBottomLeftRadius: 4,
  },
  messageBubbleRight: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  messageSenderName: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  messageText: {
    fontSize: 15,
    color: colors.textDark,
    lineHeight: 20,
  },
  messageTextRight: {
    color: colors.cardBg,
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.xs,
    padding: spacing.sm,
    backgroundColor: colors.background + "40",
    borderRadius: 8,
  },
  fileName: {
    fontSize: 12,
    color: colors.textDark,
    flex: 1,
  },
  fileNameRight: {
    color: colors.cardBg,
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  messageTime: {
    fontSize: 11,
    color: colors.textMuted,
  },
  messageTimeRight: {
    color: colors.cardBg + "CC",
  },
  readIcon: {
    marginLeft: spacing.xs,
  },
  inputContainer: {
    padding: spacing.md,
    backgroundColor: colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 15,
    color: colors.textDark,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: colors.background,
  },
  spinner: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: colors.cardBg,
    borderTopColor: "transparent",
    borderRadius: 8,
  },
});
