// export const getSaveUserConfigurationUrl = (configurationId, userId) =>
//   `${config().API_URLS_WEBAPI}/configuration/SaveUserConfiguration?id=${configurationId}&userid=${userId}`;

const baseUrl = process?.env?.NEXT_PUBLIC_BASE_URL || "";

export const getMyWalletUrl = () => `${baseUrl}/api/wallet`;
