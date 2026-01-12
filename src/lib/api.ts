// Zarkham API Client
// Communicates with the local Go CLI daemon

const API_BASE = "http://localhost:8088/api";

// --- Warden API ---

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

// --- Seeker API ---

export async function getSeekerStatus(profile: string) {
    try {
        const res = await fetch(`${API_BASE}/seeker-status?profile=${profile}`);
        if (!res.ok) throw new Error("API Error");
        return await res.json();
    } catch (e) {
        return { is_registered: false, seeker: null };
    }
}

export async function getAllWardens() {
    try {
        const res = await fetch(`${API_BASE}/wardens`);
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        return [];
    }
}

export async function connectToWarden(profile: string, wardenAuthority: string, wardenPeerID: string, mb: number) {
    const res = await fetch(`${API_BASE}/seeker/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, wardenAuthority, wardenPeerID, estimatedMb: mb })
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}

export async function disconnectWarden(profile: string, wardenAuthority: string) {
    const res = await fetch(`${API_BASE}/seeker/disconnect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, wardenAuthority })
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}

// --- Node / P2P API ---

export async function manualConnect(multiaddr: string) {
    const res = await fetch(`${API_BASE}/node/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ multiaddr })
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}

// --- Wallet API ---

export async function getWalletBalance(profile: string) {
    try {
        const res = await fetch(`${API_BASE}/balance?profile=${profile}`);
        if (!res.ok) throw new Error("Balance API Error");
        return await res.json();
    } catch (e) {
        return { lamports: 0 };
    }
}

export async function getAddresses() {
    try {
        const res = await fetch(`${API_BASE}/addresses`);
        if (!res.ok) return {};
        return await res.json();
    } catch (e) {
        return {};
    }
}