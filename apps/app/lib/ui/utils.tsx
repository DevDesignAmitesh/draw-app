import { ReactElement } from "react";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu";

interface LandingPageHeader {
  label: string;
}

export const LandingPageHeader: LandingPageHeader[] = [
  {
    label: "pricing",
  },
  {
    label: "teams",
  },
  {
    label: "roadmaps",
  },
  {
    label: "resources",
  },
];

interface HeaderDropDown {
  label: string;
}

export const HeaderDropDownUtils: HeaderDropDown[] = [
  {
    label: "how to start",
  },
  {
    label: "community",
  },
  {
    label: "use cases",
  },
  {
    label: "security",
  },
  {
    label: "blog",
  },
];

interface CompanyCurousel {
  src: string;
}

export const CompanyCurousel: CompanyCurousel[] = [
  {
    src: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Wix_logo.svg",
  },
  {
    src: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Odoo_logo.svg",
  },
  {
    src: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Microsoft_logo.svg",
  },
  {
    src: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/netflix-logo.svg",
  },
  {
    src: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Meta-logo.svg",
  },
  {
    src: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Swappie_logo.svg",
  },
  {
    src: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Linde_logo.svg",
  },
  {
    src: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Rokt_logo.svg",
  },
  {
    src: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Memfault_logo.svg",
  },
];

interface footerPublicLink {
  icon: ReactElement;
  href: string;
}

export const footerPublicLink: footerPublicLink[] = [
  {
    icon: <FaXTwitter size={20} />,
    href: "12",
  },
  {
    icon: <CiLinkedin size={20} />,
    href: "23",
  },
  {
    icon: <LuGithub size={20} />,
    href: "34",
  },
];

export interface FooterListingItems {
  label: string;
  data: { item: string[] };
}

export const FooterListingItems: FooterListingItems[] = [
  {
    label: "Explore",
    data: {
      item: [
        "Blog",
        "Libraries",
        "Community",
        "Use Cases",
        "Security & Compliance",
        "OSS NPM package",
        "Terms of use",
        "Privacy Policy",
        "Status page",
      ],
    },
  },
  {
    label: "Product",
    data: {
      item: [
        "How to start",
        "Features",
        "For Teams",
        "Pricing",
        "Roadmap",
        "Release notes",
      ],
    },
  },
  {
    label: "Contact us",
    data: {
      item: ["support@nosupport.com"],
    },
  },
];

interface ImageCarouselItems {
  label: string;
  img: string;
}

export const ImageCarouselItems: ImageCarouselItems[] = [
  {
    label: "Advanced sharing options",
    img: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Advanced%20sharing%20options.svg",
  },
  {
    label: "Live presentations",
    img: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Live%20presentations.svg",
  },
  {
    label: "Extended team collaboration",
    img: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Extended%20team%20collaboration.svg",
  },
  {
    label: "Cloud workspace management",
    img: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Cloud%20workspace%20management.svg",
  },
  {
    label: "Upgraded generative Ai",
    img: "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Upgraded_generative_AI.svg",
  },
];
