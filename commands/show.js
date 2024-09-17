const { SlashCommand, CommandOptionType } = require('slash-create');

const USER_ROLE_ID = process.env.USER_ROLE_ID;

module.exports = class ServersCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'show',
      description: 'Shows images from various sources',
      guildID: process.env.DISCORD_GUILD_ID,
      options: [
        {
          name: 'baby',
          description: 'Pictures of baby',
          type: CommandOptionType.SUB_COMMAND
        }
      ]
    });
  }

  async run(ctx) {
    console.log('hit the run');
    var subcommand = ctx.subcommands[0];
    console.log('subcommand:' + subcommand);

    if (subcommand == "baby" && (ctx.member.roles.includes(USER_ROLE_ID)|| true)) {
      console.log('baby...');
      await ctx.acknowledge(true);
      ctx.send("pong");
    }
    else {
      console.log("Unrecognized Command or Insufficient Permissions");
      ctx.send("Unrecognized Command or Insufficient Permissions");
    }
  }
}