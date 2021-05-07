import { IChannel } from "common/interface";

const SET_ACTIVE_CHANNEL = "SET_ACTIVE_CHANNEL";
export const SET_CHANNELS = "SET_CHANNELS";
export const SET_CHANNELS_SAGA = "SET_CHANNELS_SAGA";

const defaultStore = {
  channels: [
    {
      id: 1,
      name: "#general",
      active: true,
    },
    {
      id: 2,
      name: "#friends",
      active: false,
    },
  ] as Array<IChannel>,
};

const channelReducer = (state = defaultStore, action: any) => {
  let copyState = { ...state, channels: [...state.channels] };

  switch (action.type) {
    case SET_CHANNELS:
      return { ...state, channels: action.channels };

    case SET_ACTIVE_CHANNEL:
      copyState.channels.forEach((channel) => {
        channel.active = false;
      });
      let channel = copyState.channels.find(
        (x: any) => x.id === action.channelId
      );
      if (channel !== undefined) {
        channel.active = true;
      }
      return copyState;
  }

  return { ...state };
};

export const setActiveChannelAC = (channelId: number) => ({
  type: SET_ACTIVE_CHANNEL,
  channelId: channelId,
});

export const setChannelsAC = (channels: any) => ({
  type: SET_CHANNELS,
  channels: channels,
});

export const setChannelsSagaAC = {
  type: SET_CHANNELS_SAGA,
};

export default channelReducer;
