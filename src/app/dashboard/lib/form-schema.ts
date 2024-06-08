import { z } from "zod";
const MAX_UPLOAD_IMAGE_SIZE = 2048 * 2048 * 10; // 3MB
const ACCEPTED_FILE_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_FILE_VIDEO_TYPES = ["video/mp4", "video/mk4", "video/x-m4v"];

export const formLoginSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Không được bỏ trống",
    })
    .max(100, {
      message: "Tên đăng nhập quá dài",
    }),
  password: z
    .string()
    .min(1, {
      message: "Không được bỏ trống",
    })
    .max(100, {
      message: "Mật khẩu quá dài",
    }),
});
export const formCreateProductSchema = z.object({
  name_product: z.string().min(1, {
    message: "Tên sản phẩm không được bỏ trống",
  }),
  price: z.number().min(0, {
    message: "Giá tiền không đươc nhỏ hơn 0",
  }),
  discount: z
    .number()
    .min(0, {
      message: "Giảm giá không được nhỏ hơn 0",
    })
    .max(100, {
      message: "Giảm giá tối đa là 100",
    }),
  quantity: z.number().min(0, {
    message: "Số lượng không được bỏ trống",
  }),
  group_product: z.string().min(0, {
    message: "Nhóm sản phẩm không được bỏ trống",
  }),
  product_type: z
    .array(
      z.object({
        code: z.string(),
        name: z.string(),
      })
    )
    .min(1, {
      message: "Loại sản phẩm không được bỏ trống",
    }),
  status: z.coerce.boolean(),
  image: z
    .any()
    // .refine(
    //   (files) => files?.[0]?.size <= MAX_UPLOAD_IMAGE_SIZE,
    //   `Max image size is 5MB.`
    // )
    .refine(
      (files) => ACCEPTED_FILE_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  video: z
    .any()
    // .refine(
    //   (files) => files?.[0]?.size <= MAX_UPLOAD_VIDEO_SIZE,
    //   `Max video size .`
    // )
    .refine(
      (files) => ACCEPTED_FILE_VIDEO_TYPES.includes(files?.[0]?.type),
      "Only .mp4,.mkv formats are supported."
    ),
  product_info: z.string(),
});
