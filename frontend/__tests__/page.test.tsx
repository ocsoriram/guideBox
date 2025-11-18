import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Page from "../app/page";

// fetchのモックを設定するヘルパー関数
const setupFetchMock = (body: string, ok: boolean, status: number) => {
  const mockFetch = vi.fn().mockResolvedValue({
    ok,
    status,
    text: async () => body,
  });
  vi.spyOn(global, "fetch").mockImplementation(mockFetch);
  return mockFetch;
};

describe("Page page", () => {
  beforeEach(() => {
    // NEXT_PUBLIC_API_BASE_URLをモック
    vi.stubGlobal("process", {
      ...global.process,
      env: {
        ...global.process.env,
        NEXT_PUBLIC_API_BASE_URL: "http://localhost:8080",
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("見出しを表示する", () => {
    setupFetchMock("Hello from backend", true, 200);
    render(<Page />);
    expect(screen.getByText("Hello, World! (Next.js)")).toBeInTheDocument();
  });

  it("バックエンドからのメッセージを正常に表示する", async () => {
    const mockFetch = setupFetchMock("Hello from backend", true, 200);
    render(<Page />);

    // fetchが呼ばれるのを待つ
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/hello");
    });

    // メッセージが表示されるのを待つ
    expect(await screen.findByText("Hello from backend")).toBeInTheDocument();
  });

  it("バックエンドがエラーのときにエラーメッセージを表示する", async () => {
    const mockFetch = setupFetchMock("Internal Server Error", false, 500);
    render(<Page />);

    // fetchが呼ばれるのを待つ
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/hello");
    });

    // エラーメッセージが表示されるのを待つ
    expect(
      await screen.findByText("Failed to fetch: HTTP 500")
    ).toBeInTheDocument();
  });

  it("ネットワークエラーが発生したときにエラーメッセージを表示する", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
    vi.spyOn(global, "fetch").mockImplementation(mockFetch);

    render(<Page />);

    // fetchが呼ばれるのを待つ
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/hello");
    });

    // エラーメッセージが表示されるのを待つ
    expect(
      await screen.findByText("Failed to fetch: Network error")
    ).toBeInTheDocument();
  });
});
