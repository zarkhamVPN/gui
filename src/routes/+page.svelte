<script lang="ts">
    import { activeMode, activeTab } from "$lib/stores/app";
        import WardenOverview from "$lib/components/views/WardenOverview.svelte";
        import SeekerOverview from "$lib/components/views/SeekerOverview.svelte";
        import WalletView from "$lib/components/views/WalletView.svelte";
        import ConsoleView from "$lib/components/views/ConsoleView.svelte";
        import TransactionsView from "$lib/components/views/TransactionsView.svelte";
    </script>
    
    <!-- Dynamic View Rendering -->
    {#if $activeTab === 'overview'}
        {#if $activeMode === 'warden'}
            <WardenOverview />
        {:else}
            <SeekerOverview />
        {/if}
    {:else if $activeTab === 'wallet'}
        <WalletView profile={$activeMode} />
    {:else if $activeTab === 'history'}
        <TransactionsView />
    {:else if $activeTab === 'console'}
        <ConsoleView />
    {/if}
    