import React from "react";

interface ToolLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export default function ToolLogo({ name, className = "", size = 28 }: ToolLogoProps) {
  const s = size;

  switch (name.toLowerCase()) {
    case "notion":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#FFFFFF" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.6 4.3C5.3 4.2 6.5 4.1 7.4 4l9.5-.7c1.3-.1 1.7.5 1.5 1.7l-1.3 9.4c-.2 1.4-.9 1.9-2.2 2l-9.9.6c-1.2.1-1.6-.4-1.4-1.7l1.3-9.4c.2-1.3.8-1.8 2-1.9zm2.7 2.1c-.5 0-.7.3-.8.7l-1 7c-.1.5.1.7.6.7h.4l1-7c.1-.4-.2-.7-.6-.7l-.4.1zm2.8.2c-.4 0-.7.3-.8.7l-.1.8 3.5 4.8-.1.7-1 .1c-.6 0-.8.3-.9.7l-.4 2.4c-.1.4.1.7.6.7h1.4c.5 0 .8-.3.9-.7l.8-5.3 3.6 5.4.1.7-1 .1c-.5 0-.8.3-.9.7l-.3 2c-.1.5.1.7.6.7h3.7c.5 0 .8-.3.9-.7l1.3-9c.1-.5-.1-.7-.6-.7h-2.1c-.5 0-.8.3-.9.7l-.8 5.4-3.6-5.4-.1-.7 1.1-.1c.5 0 .7-.3.8-.7l.3-1.9c.1-.5-.2-.7-.6-.7H10.1z"
            fill="#000000"
          />
        </svg>
      );

    case "clickup":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#1E1F23" />
          <path
            d="M5 15.5L7.4 13.6C8.7 15.2 10.2 16 12 16C13.8 16 15.3 15.2 16.6 13.6L19 15.5C17.2 17.8 14.8 19 12 19C9.2 19 6.8 17.8 5 15.5Z"
            fill="#00E699"
          />
          <path
            d="M12 5L6 10.2L7.6 12L12 8.2L16.4 12L18 10.2L12 5Z"
            fill="url(#clickup-grad)"
          />
          <defs>
            <linearGradient id="clickup-grad" x1="6" y1="5" x2="18" y2="12" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7B68EE" />
              <stop offset="1" stopColor="#FF00DF" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "asana":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#141518" />
          <circle cx="12" cy="7.5" r="3.2" fill="#F06A6A" />
          <circle cx="6.8" cy="15.8" r="3.2" fill="#F06A6A" />
          <circle cx="17.2" cy="15.8" r="3.2" fill="#F06A6A" />
        </svg>
      );

    case "jira":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#0052CC" />
          <path
            d="M12 4.5L16.5 9L12 13.5L7.5 9L12 4.5Z"
            fill="#FFFFFF"
          />
          <path
            d="M12 10.5L16.5 15L12 19.5L7.5 15L12 10.5Z"
            fill="#2684FF"
          />
        </svg>
      );

    case "monday.com":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#1E1F24" />
          <circle cx="7" cy="14" r="2.5" fill="#F62B54" />
          <path d="M11 9C11 7.6 12.1 6.5 13.5 6.5C14.9 6.5 16 7.6 16 9V14C16 15.4 14.9 16.5 13.5 16.5C12.1 16.5 11 15.4 11 14V9Z" fill="#FFCC00" />
          <path d="M16 11.5C16 10.1 17.1 9 18.5 9C19.9 9 21 10.1 21 11.5V14C21 15.4 19.9 16.5 18.5 16.5C17.1 16.5 16 15.4 16 14V11.5Z" fill="#00CA72" />
        </svg>
      );

    case "airtable":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#181B20" />
          <path d="M11.5 5.2L5 8.2V11.3L11.5 8.3V5.2Z" fill="#2D7FF9" />
          <path d="M12.5 5.2L19 8.2V11.3L12.5 8.3V5.2Z" fill="#FCB400" />
          <path d="M12 9.5L5.5 12.5L12 15.5L18.5 12.5L12 9.5Z" fill="#F82B60" />
          <path d="M11.5 16.8L5 13.8V16.9L11.5 19.9V16.8Z" fill="#2D7FF9" />
          <path d="M12.5 16.8L19 13.8V16.9L12.5 19.9V16.8Z" fill="#FCB400" />
        </svg>
      );

    case "trello":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#0079BF" />
          <rect x="5.5" y="5.5" width="5.5" height="11" rx="1.5" fill="#FFFFFF" />
          <rect x="13" y="5.5" width="5.5" height="7.5" rx="1.5" fill="#FFFFFF" />
        </svg>
      );

    case "zendesk":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#03363D" />
          <path d="M6 7H14L6 15V7Z" fill="#00A656" />
          <path d="M18 17H10L18 9V17Z" fill="#00A656" />
        </svg>
      );

    case "hubspot":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#2D3E50" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.5 7.5C18.6 7.5 19.5 6.6 19.5 5.5C19.5 4.4 18.6 3.5 17.5 3.5C16.4 3.5 15.5 4.4 15.5 5.5C15.5 5.8 15.6 6.1 15.7 6.4L11.8 8.7C11.3 8.2 10.7 8 10 8C9.7 8 9.5 8 9.2 8.1L7.4 5.9C7.5 5.6 7.5 5.3 7.5 5C7.5 3.6 6.4 2.5 5 2.5C3.6 2.5 2.5 3.6 2.5 5C2.5 6.4 3.6 7.5 5 7.5C5.4 7.5 5.8 7.4 6.1 7.2L8 9.5C7.7 10.2 7.5 11 7.5 12C7.5 13.4 8.1 14.6 9 15.4V18.2C8.4 18.5 8 19.2 8 20C8 21.1 8.9 22 10 22C11.1 22 12 21.1 12 20C12 19.2 11.6 18.5 11 18.2V15.4C11.9 14.6 12.5 13.4 12.5 12C12.5 11.3 12.3 10.6 12 10L15.9 7.7C16.3 8.2 16.9 8.5 17.5 8.5C17.5 7.5 17.5 7.5 17.5 7.5Z"
            fill="#FF7A59"
          />
        </svg>
      );

    case "bitrix24":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#00AEEF" />
          <path
            d="M6 7H13C15.2 7 17 8.3 17 10.2C17 11.4 16.2 12.4 15 12.9C16.5 13.4 17.5 14.6 17.5 16C17.5 18.2 15.5 19.5 13 19.5H6V7ZM9.5 11.8H12.5C13.3 11.8 14 11.2 14 10.5C14 9.8 13.3 9.2 12.5 9.2H9.5V11.8ZM9.5 17.2H13C13.8 17.2 14.5 16.5 14.5 15.7C14.5 14.9 13.8 14.2 13 14.2H9.5V17.2Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "intercom":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#286EFA" />
          <path d="M6 9.5C6 8.7 6.7 8 7.5 8H8.5C9.3 8 10 8.7 10 9.5V14.5C10 15.3 9.3 16 8.5 16H7.5C6.7 16 6 15.3 6 14.5V9.5Z" fill="#FFFFFF" />
          <path d="M14 9.5C14 8.7 14.7 8 15.5 8H16.5C17.3 8 18 8.7 18 9.5V14.5C18 15.3 17.3 16 16.5 16H15.5C14.7 16 14 15.3 14 14.5V9.5Z" fill="#FFFFFF" />
          <path d="M10 11C10 10.2 10.7 9.5 11.5 9.5H12.5C13.3 9.5 14 10.2 14 11V16C14 16.8 13.3 17.5 12.5 17.5H11.5C10.7 17.5 10 16.8 10 16V11Z" fill="#FFFFFF" />
        </svg>
      );

    case "telegram":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#2AABEE" />
          <path
            d="M5.5 11.5L17.5 6.5C18.1 6.3 18.6 6.7 18.4 7.3L16.2 17.8C16.1 18.3 15.5 18.5 15.1 18.2L11.5 15.5L9.8 17.1C9.6 17.3 9.2 17.2 9.1 16.9L8.2 13.5L5.6 12.6C5.1 12.4 5.1 11.7 5.5 11.5Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "discord":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#5865F2" />
          <path
            d="M17.8 6.5C16.6 5.9 15.3 5.5 14 5.3C13.8 5.7 13.6 6.2 13.4 6.7C11.9 6.5 10.5 6.5 9.1 6.7C8.9 6.2 8.7 5.7 8.5 5.3C7.2 5.5 5.9 5.9 4.7 6.5C2.4 10.1 1.8 13.5 2.1 16.9C3.7 18.1 5.2 18.8 6.6 19.3C7 18.8 7.3 18.2 7.6 17.6C7.1 17.4 6.6 17.1 6.1 16.8C6.2 16.7 6.3 16.6 6.5 16.5C9.4 17.9 12.6 17.9 15.5 16.5C15.7 16.6 15.8 16.7 15.9 16.8C15.4 17.1 14.9 17.4 14.4 17.6C14.7 18.2 15 18.8 15.4 19.3C16.8 18.8 18.3 18.1 19.9 16.9C20.3 12.8 19.3 9.4 17.8 6.5ZM8.5 14.3C7.6 14.3 6.9 13.5 6.9 12.5C6.9 11.5 7.6 10.7 8.5 10.7C9.4 10.7 10.1 11.5 10.1 12.5C10.1 13.5 9.4 14.3 8.5 14.3ZM14.5 14.3C13.6 14.3 12.9 13.5 12.9 12.5C12.9 11.5 13.6 10.7 14.5 10.7C15.4 10.7 16.1 11.5 16.1 12.5C16.1 13.5 15.4 14.3 14.5 14.3Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "slack":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#1A1D21" />
          <path d="M6 10.5C6 9.7 6.7 9 7.5 9H9V10.5C9 11.3 8.3 12 7.5 12C6.7 12 6 11.3 6 10.5Z" fill="#36C5F0" />
          <path d="M10.5 6C9.7 6 9 6.7 9 7.5V12C9 12.8 9.7 13.5 10.5 13.5C11.3 13.5 12 12.8 12 12V7.5C12 6.7 11.3 6 10.5 6Z" fill="#36C5F0" />
          <path d="M13.5 6C14.3 6 15 6.7 15 7.5C15 8.3 14.3 9 13.5 9H12V7.5C12 6.7 12.7 6 13.5 6Z" fill="#2EB67D" />
          <path d="M18 10.5C18 9.7 17.3 9 16.5 9H12C11.2 9 10.5 9.7 10.5 10.5C10.5 11.3 11.2 12 12 12H16.5C17.3 12 18 11.3 18 10.5Z" fill="#2EB67D" />
          <path d="M18 13.5C18 14.3 17.3 15 16.5 15H15V13.5C15 12.7 15.7 12 16.5 12C17.3 12 18 12.7 18 13.5Z" fill="#E01E5A" />
          <path d="M13.5 18C14.3 18 15 17.3 15 16.5V12C15 11.2 14.3 10.5 13.5 10.5C12.7 10.5 12 11.2 12 12V16.5C12 17.3 12.7 18 13.5 18Z" fill="#E01E5A" />
          <path d="M10.5 18C9.7 18 9 17.3 9 16.5C9 15.7 9.7 15 10.5 15H12V16.5C12 17.3 11.3 18 10.5 18Z" fill="#ECB22E" />
          <path d="M6 13.5C6 14.3 6.7 15 7.5 15H12C12.8 15 13.5 14.3 13.5 13.5C13.5 12.7 12.8 12 12 12H7.5C6.7 12 6 12.7 6 13.5Z" fill="#ECB22E" />
        </svg>
      );

    case "whatsapp business":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#25D366" />
          <path
            d="M12 4C7.6 4 4 7.6 4 12C4 13.5 4.4 14.9 5.2 16.1L4.2 20L8.2 19C9.4 19.6 10.7 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4ZM15.8 15.1C15.6 15.6 14.8 16 14.3 16.1C14 16.2 13.5 16.2 12.1 15.6C10.2 14.8 8.9 12.9 8.8 12.7C8.7 12.5 8 11.5 8 10.5C8 9.5 8.5 9 8.7 8.8C8.9 8.6 9.2 8.5 9.4 8.5C9.6 8.5 9.7 8.5 9.8 8.5C10 8.5 10.1 8.4 10.3 8.8C10.5 9.3 11 10.4 11 10.5C11.1 10.6 11.1 10.8 11 10.9C10.9 11.1 10.8 11.2 10.7 11.3C10.6 11.5 10.4 11.6 10.3 11.8C10.1 12 10 12.1 10.2 12.4C10.4 12.7 11 13.7 11.9 14.5C13.1 15.5 14 15.8 14.3 16C14.6 16.1 14.8 16.1 15 15.9C15.2 15.6 15.7 15 15.8 14.7C16 14.4 16.1 14.5 16.3 14.6C16.6 14.7 17.8 15.3 18 15.4C18.2 15.5 18.3 15.6 18.3 15.7C18.3 15.8 18.2 16.5 15.8 15.1Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "zoom":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#0B5CFF" />
          <path
            d="M5 8.5C5 7.7 5.7 7 6.5 7H13.5C14.3 7 15 7.7 15 8.5V15.5C15 16.3 14.3 17 13.5 17H6.5C5.7 17 5 16.3 5 15.5V8.5Z"
            fill="#FFFFFF"
          />
          <path d="M16 10.2L19 7.8V16.2L16 13.8V10.2Z" fill="#FFFFFF" />
        </svg>
      );

    case "loom":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#625DF5" />
          <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
          <ellipse cx="12" cy="6" rx="1.8" ry="3" fill="#FFFFFF" />
          <ellipse cx="12" cy="18" rx="1.8" ry="3" fill="#FFFFFF" />
          <ellipse cx="6" cy="12" rx="3" ry="1.8" fill="#FFFFFF" />
          <ellipse cx="18" cy="12" rx="3" ry="1.8" fill="#FFFFFF" />
        </svg>
      );

    case "calendly":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#006BFF" />
          <circle cx="12" cy="12" r="6" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          <path d="M12 9V12L14.5 13.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "microsoft excel":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#107C41" />
          <rect x="5" y="5" width="14" height="14" rx="2" fill="#0E6B37" />
          <path d="M8 8L16 16M16 8L8 16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "microsoft word":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#185ABD" />
          <rect x="5" y="5" width="14" height="14" rx="2" fill="#104A9E" />
          <path d="M7 8.5L9.5 15.5L12 9.5L14.5 15.5L17 8.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "google docs":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#1E2024" />
          <path d="M6 4C4.9 4 4 4.9 4 6V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V9L15 4H6Z" fill="#4285F4" />
          <path d="M15 4V9H20L15 4Z" fill="#A1C2FA" />
          <line x1="7.5" y1="12" x2="16.5" y2="12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="7.5" y1="14.5" x2="16.5" y2="14.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="7.5" y1="17" x2="13.5" y2="17" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "google sheets":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#1E2024" />
          <path d="M6 4C4.9 4 4 4.9 4 6V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V9L15 4H6Z" fill="#0F9D58" />
          <path d="M15 4V9H20L15 4Z" fill="#87CEAC" />
          <rect x="7" y="11" width="10" height="6.5" rx="1" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="1.2" />
          <line x1="12" y1="11" x2="12" y2="17.5" stroke="#FFFFFF" strokeWidth="1.2" />
          <line x1="7" y1="14.2" x2="17" y2="14.2" stroke="#FFFFFF" strokeWidth="1.2" />
        </svg>
      );

    case "dropbox & drive":
    case "dropbox":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#0061FF" />
          <path d="M12 6.5L8 9.5L12 12.5L16 9.5L12 6.5Z" fill="#FFFFFF" />
          <path d="M4 9.5L8 12.5L4 15.5L8 18.5L12 15.5L8 12.5L4 9.5Z" fill="#FFFFFF" />
          <path d="M20 9.5L16 12.5L20 15.5L16 18.5L12 15.5L16 12.5L20 9.5Z" fill="#FFFFFF" />
        </svg>
      );

    case "capcut":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#000000" />
          <path d="M4 8.5L12 12.5L20 8.5L12 4.5L4 8.5Z" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
          <path d="M4 15.5L12 11.5L20 15.5L12 19.5L4 15.5Z" stroke="#00F0FF" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );

    case "adobe premiere pro":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#00005B" />
          <rect x="2" y="2" width="20" height="20" rx="4" stroke="#9999FF" strokeWidth="1.5" />
          <text x="5" y="17" fill="#EA77FF" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Pr</text>
        </svg>
      );

    case "canva":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="canva-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00C4CC" />
              <stop offset="1" stopColor="#7D2AE8" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="12" fill="url(#canva-grad)" />
          <text x="6" y="17" fill="#FFFFFF" fontSize="15" fontWeight="bold" fontStyle="italic" fontFamily="cursive">C</text>
        </svg>
      );

    case "adobe photoshop":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#001E36" />
          <rect x="2" y="2" width="20" height="20" rx="4" stroke="#31A8FF" strokeWidth="1.5" />
          <text x="5" y="17" fill="#31A8FF" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Ps</text>
        </svg>
      );

    case "remotion":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#0B84F3" />
          <path d="M8.5 7L17.5 12L8.5 17V7Z" fill="#FFFFFF" />
        </svg>
      );

    case "anthropic claude":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#D97757" />
          <path
            d="M12 4L13.5 9.5L19 11L13.5 12.5L12 18L10.5 12.5L5 11L10.5 9.5L12 4Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "openai gpt-4o":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#10A37F" />
          <circle cx="12" cy="12" r="5" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" fill="none" />
          <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
        </svg>
      );

    case "make / zapier":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#6D28D9" />
          <path d="M6 7L12 13L18 7" stroke="#FF4A00" strokeWidth="3" strokeLinecap="round" />
          <path d="M6 13L12 19L18 13" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "python":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#1E222A" />
          <path
            d="M11.9 4C8.6 4 8.8 5.4 8.8 5.4L8.8 6.9H12V7.4H6.2C4 7.4 4 9.6 4 9.6C4 11.8 5.3 11.8 5.3 11.8H6.5V10.3C6.5 8.6 8 8.6 8 8.6H12.1C13.7 8.6 13.7 7.1 13.7 7.1V5.4C13.7 4 11.9 4 11.9 4ZM10.5 5C10.9 5 11.2 5.3 11.2 5.7C11.2 6.1 10.9 6.4 10.5 6.4C10.1 6.4 9.8 6.1 9.8 5.7C9.8 5.3 10.1 5 10.5 5Z"
            fill="#3776AB"
          />
          <path
            d="M12.1 20C15.4 20 15.2 18.6 15.2 18.6L15.2 17.1H12V16.6H17.8C20 16.6 20 14.4 20 14.4C20 12.2 18.7 12.2 18.7 12.2H17.5V13.7C17.5 15.4 16 15.4 16 15.4H11.9C10.3 15.4 10.3 16.9 10.3 16.9V18.6C10.3 20 12.1 20 12.1 20ZM13.5 19C13.1 19 12.8 18.7 12.8 18.3C12.8 17.9 13.1 17.6 13.5 17.6C13.9 17.6 14.2 17.9 14.2 18.3C14.2 18.7 13.9 19 13.5 19Z"
            fill="#FFD438"
          />
        </svg>
      );

    case "next.js & react":
    case "next.js":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#000000" stroke="#333333" strokeWidth="1" />
          <path
            d="M17.5 18L9.2 6.5H7.5V17.5H9.2V10.2L16.2 20C16.6 19.4 17.1 18.7 17.5 18Z"
            fill="#FFFFFF"
          />
          <path d="M15 6.5H16.7V14.5H15V6.5Z" fill="#FFFFFF" />
        </svg>
      );

    case "github":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#24292E" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 4C7.6 4 4 7.6 4 12.1C4 15.7 6.3 18.7 9.5 19.8C9.9 19.9 10 19.6 10 19.4V17.8C7.8 18.3 7.3 16.7 7.3 16.7C6.9 15.8 6.4 15.5 6.4 15.5C5.7 15 6.5 15 6.5 15C7.3 15.1 7.7 15.8 7.7 15.8C8.4 17 9.5 16.6 10 16.4C10.1 15.9 10.3 15.5 10.5 15.3C8.7 15.1 6.8 14.4 6.8 11.3C6.8 10.4 7.1 9.7 7.7 9.1C7.6 8.9 7.3 8.1 7.8 7C7.8 7 8.5 6.8 10 7.8C10.7 7.6 11.3 7.5 12 7.5C12.7 7.5 13.3 7.6 14 7.8C15.5 6.8 16.2 7 16.2 7C16.7 8.1 16.4 8.9 16.3 9.1C16.9 9.7 17.2 10.4 17.2 11.3C17.2 14.4 15.3 15.1 13.5 15.3C13.8 15.6 14 16 14 16.7V19.4C14 19.6 14.1 19.9 14.5 19.8C17.7 18.7 20 15.7 20 12.1C20 7.6 16.4 4 12 4Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    default:
      return (
        <div
          style={{ width: s, height: s }}
          className={`flex items-center justify-center rounded-lg bg-surface border border-card-border font-mono text-xs font-bold text-primary-light ${className}`}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      );
  }
}
