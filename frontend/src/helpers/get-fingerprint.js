import Fingerprint2 from 'fingerprintjs2';

export const getFingerprint = async () => {
  const createFingerprint = async () => {
    const excludes = {
      plugins: true,
      localStorage: true,
      adBlock: true,
      screenResolution: true,
      availableScreenResolution: true,
      enumerateDevices: true,
      pixelRatio: true,
      doNotTrack: true,
    };
    const components = await Fingerprint2.getPromise({ excludes });
    const values = components.map(component => component.value);
    return String(Fingerprint2.x64hash128(values.join(''), 31));
  };

  let fingerprint = localStorage.getItem('fingerprint');
  if (!fingerprint) {
    fingerprint = await createFingerprint();
    localStorage.setItem('fingerprint', fingerprint);
  }
  return fingerprint;
};
