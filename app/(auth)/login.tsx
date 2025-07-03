import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Image, 
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Phone, Lock, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react-native';

const { height: screenHeight } = Dimensions.get('window');

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{phone?: string; password?: string}>({});
  const [isRTL] = useState(false); // You can connect this to your i18n context

  const validateForm = () => {
    const newErrors: {phone?: string; password?: string} = {};
    
    if (!phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (phone.length < 10) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }
    
    if (!password.trim()) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('خطأ', 'بيانات الدخول غير صحيحة');
    } finally {
      setIsLoading(false);
    }
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#A855F7', '#3B82F6']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView 
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            overScrollMode="never"
          >
            <View style={styles.content}>
              {/* Header Section */}
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require('@/assets/images/mi3ad new logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.title}>مرحباً بك</Text>
                <Text style={styles.subtitle}>تسجيل الدخول إلى حسابك</Text>
              </View>

              {/* Form Section */}
              <View style={styles.form}>
                {/* Account Type Selector */}
                <View style={styles.accountTypeContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.accountTypeButton, 
                      accountType === 'personal' && styles.accountTypeButtonActive
                    ]}
                    onPress={() => setAccountType('personal')}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.accountTypeText,
                      accountType === 'personal' && styles.accountTypeTextActive
                    ]}>شخصي</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.accountTypeButton, 
                      accountType === 'business' && styles.accountTypeButtonActive
                    ]}
                    onPress={() => setAccountType('business')}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.accountTypeText,
                      accountType === 'business' && styles.accountTypeTextActive
                    ]}>أعمال</Text>
                  </TouchableOpacity>
                </View>

                {/* Phone Input */}
                <View style={styles.inputGroup}>
                  <View style={[
                    styles.inputContainer,
                    errors.phone && styles.inputContainerError
                  ]}>
                    <Phone size={20} color="#6B7280" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.input, isRTL && styles.inputRTL]}
                      placeholder="رقم الهاتف"
                      placeholderTextColor="#9CA3AF"
                      value={phone}
                      onChangeText={(text) => {
                        setPhone(text);
                        if (errors.phone) {
                          setErrors(prev => ({ ...prev, phone: undefined }));
                        }
                      }}
                      keyboardType="phone-pad"
                      textAlign={isRTL ? 'right' : 'left'}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                  {errors.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <View style={[
                    styles.inputContainer,
                    errors.password && styles.inputContainerError
                  ]}>
                    <Lock size={20} color="#6B7280" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.input, isRTL && styles.inputRTL]}
                      placeholder="كلمة المرور"
                      placeholderTextColor="#9CA3AF"
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password) {
                          setErrors(prev => ({ ...prev, password: undefined }));
                        }
                      }}
                      secureTextEntry={!showPassword}
                      textAlign={isRTL ? 'right' : 'left'}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      style={styles.passwordToggle}
                      onPress={() => setShowPassword(!showPassword)}
                      activeOpacity={0.7}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color="#6B7280" />
                      ) : (
                        <Eye size={20} color="#6B7280" />
                      )}
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    isLoading && styles.loginButtonDisabled
                  ]}
                  onPress={handleLogin}
                  disabled={isLoading}
                  activeOpacity={0.7}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                  </Text>
                  {!isLoading && <ArrowIcon size={20} color="white" />}
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity 
                  style={styles.forgotPasswordButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.forgotPasswordText}>نسيت كلمة المرور؟</Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>ليس لديك حساب؟</Text>
                <TouchableOpacity 
                  onPress={() => router.push('/(auth)/register')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.footerLink}>إنشاء حساب جديد</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: screenHeight,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    minHeight: screenHeight - 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  logo: {
    width: 200,
    height: 120,
  },
  title: {
    fontSize: 32,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  form: {
    gap: 20,
    marginBottom: 32,
  },
  accountTypeContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 8,
  },
  accountTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    transition: 'all 0.2s ease',
  },
  accountTypeButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  accountTypeText: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  accountTypeTextActive: {
    color: '#7C3AED',
  },
  inputGroup: {
    gap: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputContainerError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    color: '#1F2937',
  },
  inputRTL: {
    textAlign: 'right',
  },
  passwordToggle: {
    padding: 4,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0.1,
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: 'bold',
    color: 'white',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    color: 'rgba(255, 255, 255, 0.8)',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingTop: 24,
  },
  footerText: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  footerLink: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: 'bold',
    color: '#60A5FA',
    textDecorationLine: 'underline',
  },
});