let local = require('../../config.json');
let getVar = (key: string) => {
    console.log(local && local[key] ? local[key] : process.env[key]);
    return local && local[key] ? local[key] : process.env[key];
}

export const USER_ROLE_ID: string = getVar('USER_ROLE_ID')
export const DEFAULT_COMPUTE_ZONE: string = getVar('DEFAULT_COMPUTE_ZONE');
export const GUILD_ID: string = getVar('DISCORD_GUILD_ID');
// TODO make dev guild
export const DISCORD_DEVELOPMENT_GUILD_ID: string = getVar('DISCORD_GUILD_ID');
export const DISCORD_APPLICATION_ID: string = getVar('DISCORD_APPLICATION_ID');
export const DISCORD_PUBLIC_KEY: string = getVar('DISCORD_PUBLIC_KEY');
export const DISCORD_TOKEN: string = getVar('DISCORD_TOKEN');


