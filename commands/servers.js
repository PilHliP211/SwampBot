const { SlashCommand, CommandOptionType } = require('slash-create');
const stringTable = require('string-table');
const Compute = require('@google-cloud/compute');
const compute = new Compute();

const USER_ROLE_ID = process.env.USER_ROLE_ID;
const DEFAULT_COMPUTE_ZONE = process.env.DEFAULT_COMPUTE_ZONE;
const DISCORD_DEVELOPMENT_GUILD_ID = process.env.DISCORD_DEVELOPMENT_GUILD_ID;

const PRESENT_VERBS = {
  start: "Starting",
  stop: "Stopping"
}
const PAST_VERBS = {
  start: "Started",
  stop: "Stopped"
}
const allowAllUsers = true;

module.exports = class ServersCommand extends SlashCommand {
  constructor(creator) {
    const guildID = DISCORD_DEVELOPMENT_GUILD_ID || process.env.DISCORD_GUILD_ID;
    super(creator, {
      name: 'servers',
      description: 'Interact with GCP Compute Engine Instances',
      guildID,
      options: [
        {
          name: 'list',
          description: 'List Compute Instances and statuses',
          type: CommandOptionType.SUB_COMMAND
        },
        {
          name: 'start',
          description: 'Start Compute Instances',
          type: CommandOptionType.SUB_COMMAND,
          options: [
            {
              name: 'name',
              description: 'Instance name',
              type: CommandOptionType.STRING,
              required: true
            },
            {
              name: 'zone',
              description: 'Instance zone (default ' + DEFAULT_COMPUTE_ZONE +  ')',
              type: CommandOptionType.STRING,
              required: false
            }
          ]
        },
        {
          name: 'stop',
          description: 'Stop Compute Instances',
          type: CommandOptionType.SUB_COMMAND,
          options: [
            {
              name: 'name',
              description: 'Instance name',
              type: CommandOptionType.STRING,
              required: true
            },
            {
              name: 'zone',
              description: 'Instance zone (default ' + DEFAULT_COMPUTE_ZONE +  ')',
              type: CommandOptionType.STRING,
              required: false
            }
          ]
        }
      ]
    });
  }

  async run(ctx) {
    console.log('hit the run');
    var subcommand = ctx.subcommands[0];
    console.log('subcommand:' + subcommand);
    
    if (subcommand == "list" && (ctx.member.roles.includes(USER_ROLE_ID) || allowAllUsers)) {
      console.log('listing...');
      await ctx.acknowledge(true);
      var table = [];
      console.log('about to getVMs');
      compute.getVMs((err, vms) => {
        if (err) {
          ctx.send( "```" + err.errors[0].message + " (" + err.code + ")```");
        }
        else {
          for (var vm of vms) {
            var extIp = ( vm.metadata.networkInterfaces[0].accessConfigs == undefined )? "N/A" : vm.metadata.networkInterfaces[0].accessConfigs[0].natIP;
            var row = {
              "name": vm.name,
              "zone": vm.zone.name,
              // "Internal IP": vm.metadata.networkInterfaces[0].networkIP,
              "external IP": extIp,
              "status": vm.metadata.status
            }
            console.log(row);
            table.push(row);
          }
        }
        var response = stringTable.create(table, { capitalizeHeaders: true, outerBorder: ' '});
        console.log(response);
        ctx.send("```" + response + "```");
      });
    }

    else if ((subcommand == "start" || subcommand == "stop") && (ctx.member.roles.includes(USER_ROLE_ID) || allowAllUsers)) {
      await ctx.acknowledge(true);
      const zoneName = (ctx.options[subcommand].zone == undefined)? DEFAULT_COMPUTE_ZONE : ctx.options[subcommand].zone;
      const zone = compute.zone(zoneName);
      const vm = zone.vm(ctx.options[subcommand].name);

      await vm [subcommand] ( (err, operation) => {
        if (err) {
          console.log(err)
          ctx.send( "```" + err.errors[0].message + " (" + err.code + ")```");
        }
        else {
          var message = PRESENT_VERBS[subcommand] + " " + vm.name + "...";
          console.log(message);
          ctx.send("```" + message + "```");
          operation.on('complete', (metadata) => {
            var message = PAST_VERBS[subcommand] + " " + vm.name + "!";
            // if start, log ext IP
            if(subcommand == "start" && vm.metadata.networkInterfaces !== undefined && vm.metadata.networkInterfaces.length){ 
              var extIp = ( vm.metadata.networkInterfaces[0].accessConfigs == undefined )? "N/A" : vm.metadata.networkInterfaces[0].accessConfigs[0].natIP;
              message += " The IP for login is: "+ extIp 
            }
            console.log(message);
            ctx.send("```" + message + "```");
          });

          operation.on('error', (err) => {
            console.log(err);
            ctx.send( "```" + err.errors[0].message + " (" + err.code + ")```");
          });
        }
      });
    }
    else {
      console.log("Unrecognized Command or Insufficient Permissions");
      ctx.send("Unrecognized Command or Insufficient Permissions");
    }
  }
}