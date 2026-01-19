import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      description: 'Edit App.tsx and save to test HMR',
      count: 'count is {{count}}',
      form: {
        title: 'Submit Request',
        subtitle: 'Fill in the form below to submit your request',
        service: {
          label: 'Service',
          placeholder: 'Select a service',
          forceBridge: 'Force Bridge',
          godwoken: 'Godwoken',
          required: 'Please select a service'
        },
        walletAddress: {
          label: 'Wallet Address',
          placeholder: 'Enter your wallet address',
          required: 'Wallet address is required'
        },
        additionalNotes: {
          label: 'Additional Notes',
          placeholder: 'Any additional information (optional)'
        },
        submit: {
          button: 'Submit',
          submitting: 'Submitting...',
          success: 'Form submitted successfully!',
          successTitle: 'Submission Successful!',
          successMessage: 'Your request has been submitted successfully. We will review and process it shortly.',
          error: 'Failed to submit form. Please try again.'
        },
        validation: {
          required: 'This field is required'
        }
      }
    },
  },
  zh: {
    translation: {
      welcome: '欢迎',
      description: '编辑 App.tsx 并保存以测试热更新',
      count: '计数为 {{count}}',
      form: {
        title: '提交请求',
        subtitle: '填写下方表单提交您的请求',
        service: {
          label: '服务',
          placeholder: '选择服务',
          forceBridge: 'Force Bridge',
          godwoken: 'Godwoken',
          required: '请选择服务'
        },
        walletAddress: {
          label: '钱包地址',
          placeholder: '输入您的钱包地址',
          required: '钱包地址为必填项'
        },
        additionalNotes: {
          label: '备注',
          placeholder: '任何额外信息（可选）'
        },
        submit: {
          button: '提交',
          submitting: '提交中...',
          success: '表单提交成功！',
          successTitle: '提交成功！',
          successMessage: '您的请求已成功提交。我们将尽快审核并处理。',
          error: '提交失败，请重试。'
        },
        validation: {
          required: '此字段为必填项'
        }
      }
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
