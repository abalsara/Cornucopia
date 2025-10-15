import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { profileStyles } from "./profileStyles";

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
    <ScrollView style={profileStyles.container}>
      {/* Profile Header */}
      <View style={profileStyles.header}>
        {/* Messages Icon - Top Right */}
        <TouchableOpacity style={profileStyles.messagesButton}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="#2196F3"
          />
        </TouchableOpacity>

        {/* Profile Content - Left and Right Layout */}
        <View style={profileStyles.headerContent}>
          {/* Left Side - Avatar and Basic Info */}
          <View style={profileStyles.leftSection}>
            <View style={profileStyles.avatarContainer}>
              {PLACEHOLDER_USER.avatarUrl ? (
                <Image
                  source={{ uri: PLACEHOLDER_USER.avatarUrl }}
                  style={profileStyles.avatar}
                />
              ) : (
                <View style={profileStyles.avatarPlaceholder}>
                  <Ionicons name="person" size={50} color="#999" />
                </View>
              )}
              <TouchableOpacity style={profileStyles.editAvatarButton}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={profileStyles.userName}>{PLACEHOLDER_USER.name}</Text>
            <Text style={profileStyles.userEmail}>{PLACEHOLDER_USER.email}</Text>
            <Text style={profileStyles.memberSince}>
              Member since {PLACEHOLDER_USER.memberSince}
            </Text>
          </View>

          {/* Right Side - Bio */}
          <View style={profileStyles.rightSection}>
            <Text style={profileStyles.bioLabel}>About</Text>
            <Text style={profileStyles.bioText}>{PLACEHOLDER_USER.bio}</Text>
            <TouchableOpacity style={profileStyles.editBioButton}>
              <Ionicons name="pencil" size={16} color="#2196F3" />
              <Text style={profileStyles.editBioText}>Edit Bio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Account Settings Section */}
      <View style={profileStyles.section}>
        <Text style={profileStyles.sectionTitle}>Account Settings</Text>

        <TouchableOpacity style={profileStyles.menuItem}>
          <View style={profileStyles.menuItemLeft}>
            <Ionicons name="person-outline" size={24} color="#333" />
            <Text style={profileStyles.menuItemText}>Edit Profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={profileStyles.menuItem}>
          <View style={profileStyles.menuItemLeft}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <Text style={profileStyles.menuItemText}>Notifications</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={profileStyles.menuItem}>
          <View style={profileStyles.menuItemLeft}>
            <Ionicons name="lock-closed-outline" size={24} color="#333" />
            <Text style={profileStyles.menuItemText}>Privacy & Security</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Support Section */}
      <View style={profileStyles.section}>
        <Text style={profileStyles.sectionTitle}>Support</Text>

        <TouchableOpacity style={profileStyles.menuItem}>
          <View style={profileStyles.menuItemLeft}>
            <Ionicons name="help-circle-outline" size={24} color="#333" />
            <Text style={profileStyles.menuItemText}>Help Center</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={profileStyles.menuItem}>
          <View style={profileStyles.menuItemLeft}>
            <Ionicons name="document-text-outline" size={24} color="#333" />
            <Text style={profileStyles.menuItemText}>Terms & Conditions</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={profileStyles.menuItem}>
          <View style={profileStyles.menuItemLeft}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#333" />
            <Text style={profileStyles.menuItemText}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={profileStyles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
        <Text style={profileStyles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Bottom Spacing */}
      <View style={profileStyles.bottomSpacing} />
    </ScrollView>
  );
}
