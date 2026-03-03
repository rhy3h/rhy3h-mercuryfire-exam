<template>
  <div
    class="min-h-screen flex items-center justify-center"
    style="background: linear-gradient(135deg, #e8eaf6 0%, #dde1f8 40%, #e4e8fb 100%)"
  >
    <!-- Card -->
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-md px-10 py-10 mx-4">
      <!-- Avatar Icon -->
      <div class="flex justify-center mb-4">
        <div
          class="w-14 h-14 rounded-full flex items-center justify-center"
          style="background: #4f46e5"
        >
          <LogIn class="text-white" :size="26" :stroke-width="2.5" />
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-center text-xl font-bold text-gray-800 mb-1">歡迎回來</h1>
      <p class="text-center text-sm text-gray-400 mb-7">請登入您的帳號以電子郵件</p>

      <!-- Email Field -->
      <div class="mb-5">
        <label class="block text-sm font-medium text-gray-700 mb-1.5">電子郵件</label>
        <div class="relative">
          <span
            class="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none"
          >
            <Mail :size="16" />
          </span>
          <input
            id="email-input"
            v-model="email"
            type="email"
            placeholder="your@email.com"
            autocomplete="email"
            class="w-full pl-9 pr-4 py-2.5 border rounded-lg text-sm outline-none transition-all focus:ring-2"
            :class="
              emailError
                ? 'border-red-400 focus:ring-red-200'
                : 'border-gray-200 focus:ring-indigo-200 focus:border-indigo-400'
            "
          />
        </div>
        <p v-if="emailError" class="mt-1 text-xs text-red-500">{{ emailError }}</p>
      </div>

      <!-- Password Field -->
      <div class="mb-5">
        <label class="block text-sm font-medium text-gray-700 mb-1.5">密碼</label>
        <div class="relative">
          <span
            class="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none"
          >
            <Lock :size="16" />
          </span>
          <input
            id="password-input"
            v-model="password"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
            class="w-full pl-9 pr-4 py-2.5 border rounded-lg text-sm outline-none transition-all focus:ring-2"
            :class="
              passwordError
                ? 'border-red-400 focus:ring-red-200'
                : 'border-gray-200 focus:ring-indigo-200 focus:border-indigo-400'
            "
          />
        </div>
        <p v-if="passwordError" class="mt-1 text-xs text-red-500">{{ passwordError }}</p>
      </div>

      <!-- Remember me + Forgot password -->
      <div class="flex items-center justify-between mb-6">
        <label class="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-600">
          <input
            id="remember-me"
            v-model="rememberMe"
            type="checkbox"
            class="accent-indigo-600 w-4 h-4 rounded"
          />
          記住我
        </label>
        <a href="#" class="text-sm text-indigo-600 hover:underline">忘記密碼？</a>
      </div>

      <!-- Login Button -->
      <button
        id="login-button"
        type="button"
        class="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
        style="background: #4f46e5"
        @click="handleSubmit"
      >
        <LogIn :size="16" :stroke-width="2.5" />
        登入
      </button>

      <!-- Success message -->
      <div
        v-if="loginSuccess"
        class="mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-sm"
        style="background: #eef2ff; color: #4f46e5; border: 1px solid #c7d2fe"
      >
        <span>✅</span>
        <span>登入成功！歡迎回來，{{ email }}</span>
      </div>

      <!-- Hint Box -->
      <div
        v-else
        class="mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-sm"
        style="background: #eef2ff; color: #4f46e5; border: 1px solid #c7d2fe"
      >
        <span>💡</span>
        <span>提示：輸入任意電子郵件和密碼都可登入</span>
      </div>
    </div>

    <!-- Register Link -->
    <div class="absolute bottom-8 text-sm text-gray-500">
      還沒有帳號？
      <a href="#" class="text-indigo-600 font-medium hover:underline">立即註冊</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, Lock, LogIn } from 'lucide-vue-next'

const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const emailError = ref('')
const passwordError = ref('')
const loginSuccess = ref(false)

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function handleSubmit() {
  emailError.value = ''
  passwordError.value = ''
  loginSuccess.value = false

  let valid = true

  if (!email.value) {
    emailError.value = '請輸入電子郵件'
    valid = false
  } else if (!validateEmail(email.value)) {
    emailError.value = '請輸入有效的電子郵件格式'
    valid = false
  }

  if (!password.value) {
    passwordError.value = '請輸入密碼'
    valid = false
  }

  if (valid) {
    loginSuccess.value = true
    router.push({ name: 'dashboard' })
  }
}
</script>
