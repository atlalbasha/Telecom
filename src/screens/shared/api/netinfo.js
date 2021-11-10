import NetInfo from '@react-native-community/netinfo'

const netInfoApi = () =>
  NetInfo.fetch().then((state) => {
    return state
    console.log(state.type)
    console.log(state.isConnected)
    console.log(state.details)
  })

export default netInfoApi
