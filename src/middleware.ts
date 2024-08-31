import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // ** pagination으로 바꿀때 주석 해제 **//
  // const PAGE_SIZE = "10";
  // const CURRENT_PAGE = "1";
  // const pageSize = request.nextUrl.searchParams.get("pageSize");
  // const currentPage = request.nextUrl.searchParams.get("currentPage");

  if (request.nextUrl.pathname === "/") {
    // if (pageSize && currentPage) return;
    const url = request.nextUrl.clone();
    url.pathname = "/posts";
    // url.searchParams.set("pageSize", PAGE_SIZE);
    // url.searchParams.set("currentPage", CURRENT_PAGE);
    return NextResponse.redirect(url);
  }

  // if (request.nextUrl.pathname.startsWith("/posts")) {
  //   if (pageSize && currentPage) return;
  //   const url = request.nextUrl.clone();
  //   url.searchParams.set("pageSize", PAGE_SIZE);
  //   url.searchParams.set("currentPage", CURRENT_PAGE);
  //   return NextResponse.redirect(url);
  // }
  return;
}
