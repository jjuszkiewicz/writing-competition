import { COOKIE_TOKEN_KEY } from "@/config";
import { cookies } from "next/headers";

type FetchClientOption = { revalidate?: number; tags?: string[] };

function createAuthHeaders() {
  let headers;
  const token = cookies().get(COOKIE_TOKEN_KEY)?.value;
  if (token) {
    headers = { "access-token": token };
  }

  return headers;
}

export async function fetchClient<P = unknown>(
  url: string,
  options: FetchClientOption = { revalidate: 10 }
): Promise<P> {
  const { revalidate, tags } = options;

  const headers = createAuthHeaders();
  const res = await fetch(url, {
    next: { revalidate: revalidate || 10, tags },
    headers,
  });

  if (!res.ok) {
    console.error(res);
    throw new Error(`problem with getting data, status code: ${res.status}`, {
      cause: res.status,
    });
  }

  return await res.json();
}

export async function saveClient<P = void>(
  method: "POST" | "PATCH" | "PUT",
  url: string,
  data: any
): Promise<P> {
  const headers = createAuthHeaders();
  const res = await fetch(url, {
    method,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error(res);
    throw new Error(`problem with update data, status code: ${res.status}`, {
      cause: res.status,
    });
  }
  if (res.status === 201 || res.status === 200) {
    return await res.json();
  }
}
