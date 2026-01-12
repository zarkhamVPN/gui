// Zarkham API Client
// Communicates with the local Go CLI daemon

const API_BASE = "http://localhost:8088/api";

export async function getWardenStatus(profile: string) {
  try {
    const res = await fetch(`${API_BASE}/warden-status?profile=${profile}`);
    if (!res.ok) throw new Error("API Error");
    return await res.json();
  } catch (e) {
    console.error(e);
    return { is_registered: false, warden: null };
  }
}

export async function registerWarden(profile: string, token: string, amount: number) {
  const res = await fetch(`${API_BASE}/register-warden`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile, stakeToken: token, stakeAmount: amount }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function checkWardenCorruption(profile: string) {
    const res = await fetch(`${API_BASE}/check-warden-corruption?profile=${profile}`);
    return await res.json();
}

export async function migrateWarden(profile: string) {
    const res = await fetch(`${API_BASE}/migrate-warden`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `profile=${profile}`
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}
