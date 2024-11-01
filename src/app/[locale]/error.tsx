"use client";

import { Translation } from "@/components";
import { ErrorLayout } from "@/components/layout";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorLayout>
      <div className="text-center p-4">
        <h5 className="text-secondary">
          <Translation
            translationKey="ErrorMessage"
            render={(t) => <>{t("any_error")}</>}
          />
        </h5>
        <div className="mt-4">
          <button
            className="btn btn-secondary pt-0 pb-0 me-4"
            onClick={() => reset()}
          >
            <Translation
              translationKey="ButtonTitle"
              render={(t) => <>{t("please_try_again_btn")}</>}
            />
          </button>
          <Link href="/" className="btn btn-primary pt-0 pb-0">
            <Translation
              translationKey="ButtonTitle"
              render={(t) => <>{t("home_return_btn")}</>}
            />
          </Link>
        </div>
      </div>
    </ErrorLayout>
  );
}
