import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  tr: {
    translation: {
      nav: {
        home: 'Ana Sayfa',
        services: 'Hizmetler',
        projects: 'Projeler',
        videos: 'Videolar',
        blog: 'Blog',
        about: 'Hakkımızda',
        contact: 'İletişim',
        admin: 'Admin',
      },
      blog: {
        title: 'Blog',
        readMore: 'Devamını Oku',
        backToBlog: 'Blog\'a Dön',
        share: 'Paylaş',
        publishedOn: 'Yayınlanma Tarihi',
        category: 'Kategori',
        tags: 'Etiketler',
      },
      common: {
        loading: 'Yükleniyor...',
        error: 'Bir hata oluştu',
        save: 'Kaydet',
        cancel: 'İptal',
        edit: 'Düzenle',
        delete: 'Sil',
      }
    },
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        services: 'Services',
        projects: 'Projects',
        videos: 'Videos',
        blog: 'Blog',
        about: 'About',
        contact: 'Contact',
        admin: 'Admin',
      },
      blog: {
        title: 'Blog',
        readMore: 'Read More',
        backToBlog: 'Back to Blog',
        share: 'Share',
        publishedOn: 'Published On',
        category: 'Category',
        tags: 'Tags',
      },
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
      }
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
