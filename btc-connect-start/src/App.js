import React, { useState, useEffect } from 'react';

// Function to truncate addresses for display
function truncateAddress(address) {
  return address ? `${address.slice(0, 6)}...${address.slice(address.length - 4)}` : '';
}

// BTC Connect related imports




const App = () => {
  // Hooks for Ethereum and Bitcoin provider and connect modal


  // State variables
  const [balanceEVM, setBalanceEVM] = useState(null);
  const [balanceBTC, setBalanceBTC] = useState(null);
  const [btcNetwork, setBtcNetwork] = useState('');

  const [evmAddress, setEvmAddress] = useState(''); // State to get the address from the UI input
  const [btcAddress, setBtcAddress] = useState(''); // State to get the address from the UI input
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedAddress, setCopiedAddress] = useState(null); 

  // Initialize custom Ethereum provider— ethers v6 in this case
  // For ethers v5 use: const customProvider = new ethers.providers.Web3Provider(provider, "any");
  // Adapt the other ethers functions to V5 in case


  // Handler to open connect modal
  const handleLogin = () => {

  };

  // Effect to fetch balances and network information when the Bitcoin account changes
  useEffect(() => {
    if (!customProvider || !account || !accounts.length) return;
  
    const fetchBalancesAndNetwork = async () => {
      try {
        // Fetch Ethereum balance

  
        // Fetch Bitcoin network and balance
        const network = await getNetwork();
        setBtcNetwork(network);
        const networkSuffix = network === 'livenet' ? 'main' : 'test3';
        const response = await fetch(`https://api.blockcypher.com/v1/btc/${networkSuffix}/addrs/${accounts[0]}/balance`);
  
        if (response.status === 429) {
          setErrorMessage('Too many requests. Please try again later.');
          return;
        }
  
        const data = await response.json();
        setBalanceBTC(data.balance / 1e8);
      } catch (error) {
        console.error('Error fetching balances or network info:', error);
        setErrorMessage('Error fetching data. Please try again.');
      }
    };
  
    fetchBalancesAndNetwork();
  }, [customProvider, account, accounts, getNetwork]);
  



  // Handler to execute Ethereum transaction
  const executeTxEvm = async () => {

  };

  // Handler to execute Bitcoin transaction
  const executeTxBtc = async () => {

  };

  // Handler to copy address to clipboard
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return ( 
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black">
      <img src="./dark.png" alt="Logo 1" className=" object-contain mb-4 " />
      <div className="flex space-x-2 mb-4 bg-slate-100 py-2 px-2 rounded-lg shadow-lg">
  <img src="./btc-sl.png" alt="Logo 1" className="h-96 object-contain" />

</div>

      {!account ? (
        <button
          className="flex items-center justify-center bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full"
          onClick={handleLogin}
        >
          <img src="https://i.imgur.com/aTxNcXk.png" alt="Bitcoin Logo" className="w-6 h-6 mr-2" />
          Connect
        </button>
      ) : (
        <div className="flex justify-center space-x-4 w-full max-w-5xl mb-8">
          <div className="border border-purple-500 p-6 rounded-lg">
            <div className="w-full p-4 bg-gray-800 rounded-lg mb-4">
              <span className="text-lg font-bold text-white">EVM equivalent generated address</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-semibold text-white">{balanceEVM !== null ? `${balanceEVM} BTC` : 'Loading...'}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">{truncateAddress(account)}</span>
                  <button onClick={() => handleCopy(account)} className="text-gray-400 hover:text-white">
                    {copiedAddress === account ? (
                      <span className="text-green-500">Copied!</span>
                    ) : (
                      <span className="text-gray-400 hover:text-white">Copy</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <span className="text-lg text-white mb-2">Send 0.000001 BTC to</span>
            <div className="w-full p-4 bg-gray-800 rounded-lg mb-4">
              <label htmlFor="evmAddress" className="text-lg font-bold text-white">Enter EVM Address</label>
              <input
                type="text"
                id="evmAddress"
                className="w-full p-2 mt-2 border border-gray-600 rounded bg-gray-900 text-white"
                value={evmAddress}
                onChange={(e) => setEvmAddress(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <button
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 rounded-full mt-2"
              onClick={executeTxEvm}
            >
              Execute EVM Transaction
            </button>
          </div>
          <div className="border border-purple-500 p-6 rounded-lg">
            <div className="w-full p-4 bg-gray-800 rounded-lg mb-4">
              <span className="text-lg font-bold text-white">BTC Address address</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-semibold text-white">{balanceBTC !== null ? `${balanceBTC} BTC` : (errorMessage || 'Loading...')}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">{truncateAddress(accounts[0])}</span>
                  <button onClick={() => handleCopy(accounts[0])} className="text-gray-400 hover:text-white">
                    {copiedAddress === accounts[0] ? (
                      <span className="text-green-500">Copied!</span>
                    ) : (
                      <span className="text-gray-400 hover:text-white">Copy</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <span className="text-lg text-white mb-2">Send 1 Sats to</span>
            <div className="w-full p-4 bg-gray-800 rounded-lg mb-4">
              <label htmlFor="btcAddress" className="text-lg font-bold text-white">Enter BTC Address</label>
              <input
                type="text"
                id="btcAddress"
                className="w-full p-2 mt-2 border border-gray-600 rounded bg-gray-900 text-white"
                value={btcAddress}
                onChange={(e) => setBtcAddress(e.target.value)}
                placeholder="bc1..."
              />
            </div>
            <button
              className="w-full bg-orange-500 hover:bg-orange-800 text-white font-bold py-2 rounded-full mt-2"
              onClick={executeTxBtc}
            >
              Execute BTC Transaction
            </button>
          </div>
        </div>
      )}
      {account && (
        <button
          className="w-32 bg-red-700 hover:bg-red-800 text-white font-bold py-2 rounded-full"
          onClick={disconnect}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default App;