<template>
  <div class="social-links">
    <a :href="t.social.github" class="social-link" title="GitHub" target="_blank" rel="noopener noreferrer">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    </a>
    <a :href="t.social.linkedin" class="social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>
    <button class="social-link wechat-link" title="WeChat" @click="showWeChatQR">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.162 4.203 2.997 5.5l-.756 2.281 2.565-1.281c.693.132 1.406.219 2.885.219.198 0 .393-.009.585-.024C8.15 15.65 8.691 15.068 8.691 14.5c0-2.82 2.527-5.107 5.64-5.107.2 0 .4.009.595.027C14.691 6.188 11.999 2.188 8.691 2.188zm-2.46 6.695c-.563 0-1.02-.456-1.02-1.02s.457-1.02 1.02-1.02c.564 0 1.021.456 1.021 1.02s-.457 1.02-1.021 1.02zm5.126 0c-.563 0-1.02-.456-1.02-1.02s.457-1.02 1.02-1.02c.564 0 1.021.456 1.021 1.02s-.457 1.02-1.021 1.02z"/>
        <path d="M14.331 11.375c-3.423 0-6.201 2.235-6.201 4.99 0 1.704 1.045 3.222 2.682 4.135l-.635 1.905 2.357-1.174c.635.127 1.240.19 1.797.19 3.423 0 6.201-2.235 6.201-4.99s-2.778-4.99-6.201-4.99zm-2.49 3.422c-.441 0-.798-.357-.798-.798s.357-.798.798-.798.798.357.798.798-.357.798-.798.798zm4.98 0c-.441 0-.798-.357-.798-.798s.357-.798.798-.798.798.357.798.798-.357.798-.798.798z"/>
      </svg>
    </button>

    <!-- WeChat QR Code Modal -->
    <div v-if="showQRModal" class="qr-modal-overlay" @click="closeWeChatQR">
      <div class="qr-modal" @click.stop>
        <button class="close-btn" @click="closeWeChatQR">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="qr-content">
          <div class="qr-placeholder">
            <!-- Replace this with your actual QR code image -->
            <img
                src="/wechat-qr.png"
                alt="WeChat QR Code"
                class="qr-image"
                @error="handleImageError"
            />
            <!-- Fallback content if image fails to load -->
            <div v-if="imageError" class="qr-fallback">
              <div class="qr-pattern">
                <div class="qr-corner top-left"></div>
                <div class="qr-corner top-right"></div>
                <div class="qr-corner bottom-left"></div>
                <div class="qr-data"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t } = storeToRefs(store)

// Modal state
const showQRModal = ref(false)
const imageError = ref(false)

// Show WeChat QR code modal
const showWeChatQR = () => {
  showQRModal.value = true
  imageError.value = false
}

// Close WeChat QR code modal
const closeWeChatQR = () => {
  showQRModal.value = false
}

// Handle image load error
const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.social-links {
  display: flex;
  gap: 1.5rem;
  margin-top: auto;
  padding-bottom: 2rem;
}

.social-link {
  color: var(--text-secondary);
  transition: all var(--transition-base);
  text-decoration: none;
  width: 24px;
  height: 24px;
}

.social-link:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
}

.wechat-link {
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}

.wechat-link:hover {
  color: #07c160; /* WeChat green color */
}

/* QR Code Modal Styles */
.qr-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.qr-modal {
  position: relative;
  max-width: 320px;
  width: 90%;
  animation: slideUp 0.3s ease;
}

.close-btn {
  position: absolute;
  top: -15px;
  right: -15px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all var(--transition-base);
  z-index: 1001;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--text-primary);
  background: var(--primary-color);
  border-color: var(--primary-color);
  transform: scale(1.1);
}

.qr-content {
  text-align: center;
}

.qr-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qr-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.qr-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
}

.qr-pattern {
  width: 200px;
  height: 200px;
  background: white;
  border-radius: 0.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-corner {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 4px solid #000;
}

.qr-corner.top-left {
  top: 10px;
  left: 10px;
  border-right: none;
  border-bottom: none;
}

.qr-corner.top-right {
  top: 10px;
  right: 10px;
  border-left: none;
  border-bottom: none;
}

.qr-corner.bottom-left {
  bottom: 10px;
  left: 10px;
  border-right: none;
  border-top: none;
}

.qr-data {
  width: 120px;
  height: 120px;
  background: repeating-linear-gradient(
      0deg,
      #000 0px,
      #000 4px,
      transparent 4px,
      transparent 8px
  ),
  repeating-linear-gradient(
      90deg,
      #000 0px,
      #000 4px,
      transparent 4px,
      transparent 8px
  );
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .qr-modal {
    max-width: 280px;
    margin: 1rem;
  }

  .close-btn {
    top: -12px;
    right: -12px;
    width: 35px;
    height: 35px;
  }

  .qr-pattern {
    width: 160px;
    height: 160px;
  }
}

@media (max-width: 1024px) {
  .social-links {
    justify-content: center;
    margin-top: 2rem;
  }
}
</style>