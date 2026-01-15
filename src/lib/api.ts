// Zarkham API Client
// Communicates with the local Go CLI daemon

const API_BASE = "/api";

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

export async function manualConnect(multiaddr: string, estimatedMb?: number) {
    const res = await fetch(`${API_BASE}/node/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ multiaddr, estimatedMb })
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}

// --- Node Control ---

export async function getNodeStatus() {
    try {
        const res = await fetch(`${API_BASE}/node/status`);
        if (!res.ok) throw new Error("Status Error");
        return await res.json();
    } catch (e) {
        return { isRunning: false };
    }
}

export async function startNode() {
    await fetch(`${API_BASE}/node/start`, { method: "POST" });
}

export async function stopNode() {
    await fetch(`${API_BASE}/node/stop`, { method: "POST" });
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



export async function getProfile() {

    try {

        const res = await fetch(`${API_BASE}/profile`);

        if (!res.ok) return { profile: 'warden' };

        return await res.json();

    } catch (e) {

        return { profile: 'warden' };

    }

}



export async function getHistory(profile: string) {
    try {
        const res = await fetch(`${API_BASE}/history?profile=${profile}`);
        if (!res.ok) throw new Error("History API Error");
        return await res.json();
    } catch (e) {
        return { solHistory: [], arkhamHistory: [], connectionHistory: [], throughputHistory: [] };
    }
}

export async function transferFunds(profile: string, recipient: string, amount: number) {
    const res = await fetch(`${API_BASE}/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, recipient, amount })
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}
