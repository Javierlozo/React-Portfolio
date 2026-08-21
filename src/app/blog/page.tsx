import { Metadata } from "next";
import { getAllBlogPosts } from "../../lib/blog-server";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "Blog - Security Labs & Technical Writeups",
  description:
    "Hands-on cybersecurity lab writeups covering packet analysis, network forensics, tcpdump, Wireshark, and incident response. Real analysis with real captures.",
  keywords: [
    "cybersecurity blog",
    "packet analysis",
    "network forensics",
    "tcpdump tutorial",
    "wireshark tutorial",
    "security labs",
    "PCAP analysis",
  ],
  alternates: { canonical: "https://www.luislozoya.com/blog" },
  openGraph: {
    title: "Blog - Security Labs & Technical Writeups",
    description:
      "Hands-on cybersecurity lab writeups covering packet analysis, network forensics, and incident response.",
    url: "https://www.luislozoya.com/blog",
    type: "website",
  },
};

export default function BlogIndex() {
  return <BlogIndexClient posts={getAllBlogPosts()} />;
}
