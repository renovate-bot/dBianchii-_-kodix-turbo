"use client";

import React from "react";

import { api } from "~/utils/api";

export default function Client() {
  const apps = api.app.getAll.useQuery();

  return (
    <div>
      <p className="h-5 w-20 bg-red-200">I am inside a client component</p>
      {JSON.stringify(apps.data)}
    </div>
  );
}
