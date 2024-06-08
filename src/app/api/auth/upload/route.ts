import { NextRequest, NextResponse } from "next/server";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next/types";
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: NextRequest) {
  try {
    // const data = await req.formData();
    // const image = data.get("image") as unknown as File;
    // if (!image) {
    //   return NextResponse.json(
    //     { mesasge: "No file uploaded" },
    //     { status: 400 }
    //   );
    // }
    // const arrayBuffer = await image.arrayBuffer();
    // const buffer = new Uint8Array(arrayBuffer);
    // await fs.writeFile(`./public/images/${image.name}`, buffer);
    return NextResponse.json({ done: "oke" });
  } catch (error) {
    return NextResponse.json({ done: "error" });
  }
}
