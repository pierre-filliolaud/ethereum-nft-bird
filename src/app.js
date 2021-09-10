App = {
    loading: false,
    contracts: {},
  
    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
    },
  
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },
  
    loadAccount: async () => {
      // Set the current blockchain account
      App.account = web3.eth.accounts[0]
      web3.eth.defaultAccount = web3.eth.accounts[0]
      console.log('Account used: '+App.account)
    },
  
    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      // Bird Contract
      const bird = await $.getJSON('Bird.json')
      App.contracts.Bird = TruffleContract(bird)
      App.contracts.Bird.setProvider(App.web3Provider)
  
      // Hydrate the smart contract with values from the blockchain
      App.bird = await App.contracts.Bird.deployed()
      console.log("Bird SmartContract used: "+App.bird.address)
    },
  
    render: async () => {
      // Prevent double render
      if (App.loading) {
        return
      }
  
      // Update app loading state
      App.setLoading(true)
  
      // Render Account
      $('#account').html(App.account)
      $('#birdContract').html(App.bird.address)
  
      // Render Birds
      await App.renderBirds()
  
      // Update loading state
      App.setLoading(false)
    },
  
    renderBirds: async () => {
      // Load all birds from the blockchain
      const birdCount = await App.bird.totalSupply()
      const $birdTemplate = $('.birdTemplate')
      $('.birdTemplate').remove()
      console.log('birdCount: '+birdCount)
      for (var i = 0; i < birdCount; i++) {
        const birdId = await App.bird.birds(i)
        
        console.log('birdId: '+birdId)

        // Create the html for the bird
        const $newBirdTemplate = $birdTemplate.clone()
        $newBirdTemplate.find('#birdId').html(birdId)
        $newBirdTemplate.find('#birdImg').attr('src', "https://www.peppercarrot.com/extras/html/2019_bird-generator/avatar.php?seed="+birdId);
        // $newBirdTemplate.find('.birdImg').html(birdImg).attr(src, img_02.png);
        // .prop('birdId', birdId)

        $('#birdList').append($newBirdTemplate)

        // Show the birds
        $newBirdTemplate.show()
      }
    },

    mintBird: async () => {
      App.setLoading(true)
      const bird = $('#bird').val();

      // var etherAmount = web3.toBigNumber($("#paidAmount").val());
      // var weiValue = web3.toWei(etherAmount,'ether');
      await App.bird.mint(bird, {from: web3.eth.accounts[0]})
      window.location.reload()
    },
  
    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $('#content')
      if (boolean) {
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }
  }
  
  $(() => {
    $(window).load(() => {
      App.load()
    })
  })