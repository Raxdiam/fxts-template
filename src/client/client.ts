const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

RegisterCommand('veh',  async (source: number, args: any[], raw: string) => {
    if (args.length < 1) {
      emit('chat:addMessage', {
        args: [`You must specify a vehicle model!`],
      });
      return;
    }

    const model = args[0].toString();
    const hash = GetHashKey(model);

    if (!IsModelInCdimage(hash) || !IsModelAVehicle(hash)) {
      emit('chat:addMessage', {
        args: [`${model} is not a valid vehicle model!`],
      });
      return;
    }

    RequestModel(hash);
    while (!HasModelLoaded(hash)) {
      await Delay(500);
    }

    const ped = PlayerPedId();
    const [x, y, z] = GetEntityCoords(ped, true);
    const veh = CreateVehicle(hash, x, y, z, GetEntityHeading(ped), true, false);

    SetPedIntoVehicle(ped, veh, -1);

    SetEntityAsNoLongerNeeded(veh);
    SetModelAsNoLongerNeeded(model);

    emit('chat:addMessage', {
      args: [`Spawned ${model}`],
    });
  },
  false
);
