import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {styles} from "./profile-styles";

// Placeholder data
const PLACEHOLDER_USER = {
  name: "John Doe",
  email: "john.doe@example.com",
  memberSince: "January 2024",
  avatarUrl: null, // Will use placeholder
  bio: "Placeholder Bio",
};

export default function profile() {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        {/* Messages Icon - Top Right */}
        <TouchableOpacity style={styles.messagesButton}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#2196F3" />
        </TouchableOpacity>

        {/* Profile Content - Left and Right Layout */}
        <View style={styles.headerContent}>
          {/* Left Side - Avatar and Basic Info */}
          <View style={styles.leftSection}>
            <View style={styles.avatarContainer}>
              {PLACEHOLDER_USER.avatarUrl ? (
                <Image
                  source={{ uri: PLACEHOLDER_USER.avatarUrl }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={50} color="#999" />
                </View>
              )}
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={styles.userName}>{PLACEHOLDER_USER.name}</Text>
            <Text style={styles.userEmail}>{PLACEHOLDER_USER.email}</Text>
            <Text style={styles.memberSince}>Member since {PLACEHOLDER_USER.memberSince}</Text>
          </View>

          {/* Right Side - Bio */}
          <View style={styles.rightSection}>
            <Text style={styles.bioLabel}>About</Text>
            <Text style={styles.bioText}>{PLACEHOLDER_USER.bio}</Text>
            <TouchableOpacity style={styles.editBioButton}>
              <Ionicons name="pencil" size={16} color="#2196F3" />
              <Text style={styles.editBioText}>Edit Bio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>


      {/* Account Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="person-outline" size={24} color="#333" />
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <Text style={styles.menuItemText}>Notifications</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="lock-closed-outline" size={24} color="#333" />
            <Text style={styles.menuItemText}>Privacy & Security</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="help-circle-outline" size={24} color="#333" />
            <Text style={styles.menuItemText}>Help Center</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="document-text-outline" size={24} color="#333" />
            <Text style={styles.menuItemText}>Terms & Conditions</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#333" />
            <Text style={styles.menuItemText}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}


