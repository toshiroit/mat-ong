import { Suspense } from "react";
import { FormLogin } from "../components/form-login";

export default function Page() {
  return (
    <div>
      <Suspense>
        <FormLogin />
      </Suspense>
    </div>
  );
}
