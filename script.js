const connectButton = document.getElementById('connectButton');
const accountInfo = document.getElementById('accountInfo');

// Проверяем наличие кошелька (MetaMask)
if (typeof window.ethereum !== 'undefined') {
    console.log('Метамаск установлен!');

    // В v6 используется BrowserProvider
    const provider = new ethers.BrowserProvider(window.ethereum);

    connectButton.addEventListener('click', async () => {
        try {
            // Запрашиваем доступ к аккаунту
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // В v6 getSigner() возвращает Promise, поэтому нужен await
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            
            // Получаем баланс
            const balance = await provider.getBalance(address);
            
            // Исправленные шаблонные строки (без пробелов после $)
            accountInfo.innerHTML = `
                <p>Адрес кошелька: ${address}</p>
                <p>Баланс (в Wei): ${balance.toString()}</p>
                <p>Баланс (в Ether): ${ethers.formatEther(balance)}</p>
            `;
        } catch (error) {
            console.error("Ошибка при подключении:", error);
            accountInfo.innerHTML = `<p style="color:red">Ошибка: ${error.message}</p>`;
        }
    });
} else {
    accountInfo.innerHTML = '<p>Пожалуйста, установите MetaMask!</p>';
}
