(async () => {
    const [leaderboardRes, marketRes] = await Promise.all([
        fetch('https://api-game.bloque.app/game/leaderboard'),
        fetch('https://api-game.bloque.app/game/market')
    ]);

    const { players } = await leaderboardRes.json();
    const { items } = await marketRes.json();

    const getFishermanClass = rank => ({
        1: 'fisherman-1',
        2: 'fisherman-2',
        3: 'fisherman-3'
    }[rank] || 'fisherman-4');

    const getWoodClass = rank => ({
        1: 'font-bold text-white border-b-15',
        2: 'font-bold text-white border-b-12',
        3: 'font-bold text-white border-b-10'
    }[rank] || 'font-medium border-b-5');

    const getBadgeClass = rank => ({
        1: 'bg-yellow-700',
        2: 'bg-teal-700',
        3: 'bg-orange-700'
    }[rank] || 'bg-black');

    const getFishClass = () => {
        const rand = Math.floor(Math.random() * 3);
        return rand === 0 ? 'opacity-0' : 'opacity-100';
    };

    const simplifyAmount = amount => Math.floor(amount / 1000) + 'k';

    const leaderboardHTML = players.map(player => `
        <div class='flex items-end gap-10'>
            <span class="font-bold text-2xl text-center text-white ${ getBadgeClass(player.rank) } px-3 rounded-full self-center">${player.rank}</span>

            <div class="size-10 fish ${getFishClass()} animate-bounce hidden sm:block"></div>

            <div class="w-full texture-wood bg-amber-600 py-6 pl-10 border-2 border-r-0 border-black rounded-bl-lg relative wood ${getWoodClass(player.rank)}">
                <div class="size-10 ${getFishermanClass(player.rank)} absolute -left-3 -top-1"></div>
                <div class="flex flex-col">
                    <span>${player.username} lvl. ${player.level}</span>
                    <span class="text-sm">Gold ${simplifyAmount(player.gold)}</span>
                    <span class="text-sm">XP. ${simplifyAmount(player.xp)}</span>
                </div>
            </div>
        </div>
    `).join('');

    const marketHTML = items.map(item => `
        <div class="flex items-center">
            <div class="min-w-10 h-10 old-man walk"></div>
            <div class="min-w-10 h-10 box"></div>
            <div class="font-bold text-xs flex flex-col">
                <div class="text-nowrap">${item.name}</div>
                <div class="text-amber-600">${simplifyAmount(item.cost)}</div>
            </div>
        </div>
    `).join('');

    document.querySelector('#players').innerHTML = leaderboardHTML;
    document.querySelector('#market').innerHTML = marketHTML;
    document.querySelector('#beach').style.height = `${players.length * 140}px`; // 117 + 21
})();