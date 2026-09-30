import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/appointment", "/consultation"],
        disallow: ["/admin", "/admin/*", "/api", "/api/*"],
      },
    ],
  };
}
