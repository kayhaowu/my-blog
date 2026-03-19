import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

const fontBold = fetch(
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700&display=swap"
)
  .then((res) => res.text())
  .then((css) => {
    const match = css.match(/src: url\((.+?)\)/);
    return match ? fetch(match[1]).then((res) => res.arrayBuffer()) : null;
  });

export async function GET(req: NextRequest) {
  try {
    const fontData = await fontBold;

    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");

    if (!title) {
      return new Response("No title provided", { status: 500 });
    }

    const heading =
      title.length > 140 ? `${title.substring(0, 140)}...` : title;

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-12 w-full h-full items-start"
          style={{ backgroundColor: "#0a0a0a", color: "#e8e4de" }}
        >
          <div tw="flex items-center">
            <div
              tw="w-3 h-10 mr-4"
              style={{ backgroundColor: "#e2884d" }}
            />
            <p tw="font-bold text-2xl" style={{ color: "#e8e4de" }}>
              {siteConfig.name}
            </p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div
              tw="flex text-xl uppercase font-bold tracking-tight"
              style={{ color: "#e2884d" }}
            >
              BLOG POST
            </div>
            <div tw="flex text-[56px] font-bold mt-4 leading-tight">
              {heading}
            </div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-lg" style={{ color: "#737373" }}>
              {siteConfig.url}
            </div>
            <div tw="flex text-lg" style={{ color: "#737373" }}>
              {siteConfig.author}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        ...(fontData
          ? {
              fonts: [
                {
                  name: "Plus Jakarta Sans",
                  data: fontData,
                  style: "normal" as const,
                  weight: 700 as const,
                },
              ],
            }
          : {}),
      }
    );
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
