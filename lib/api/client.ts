export class ContentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentError";
  }
}

export function useMockData() {
  return process.env.NEXT_PUBLIC_USE_MOCK === "true";
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    throw new ContentError("NEXT_PUBLIC_API_BASE_URL is not set.");
  }

  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new ContentError(`The wire returned ${response.status} for ${path}.`);
  }

  return (await response.json()) as T;
}
