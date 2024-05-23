const { DiscordAPIError, MessageSelectMenu, MessageAttachment, MessageButton, MessageActionRow, MessageEmbed, Collection, Intents, Client } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const { version } = require("discord.js")
const moment = require('moment');
require("moment-duration-format");
const fs = require('fs');
const path = require("path");
const {
    token,
    robuxTaxRate,
    prefix
} = require('./config.json')
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ] 
});
 // Declare client to be a new Discord Client (bot)
require('http').createServer((req, res) => res.end(`
Dveloper Bot : Ahmed Clipper
Server Support : https://dsc.gg/clipper-tv
`)).listen(3000) //Dont remove this 
  /*
  Code Below provides info about the bot 
  once it's ready
  */

const Discord = require('discord.js');
const Timers = new Map();
const color = "#0099ff"

//Fix Erorr Project
process.on("uncaughtException" , err => {
return;
})
 
process.on("unhandledRejection" , err => {
return;
})
 
process.on("rejectionHandled", error => {
  return;
});
client.on('ready', () => {
  console.log(``);
  console.log(`</> Logged in as : ${client.user.tag}!`);
  console.log(`</> Servers : ${client.guilds.cache.size}`);
  console.log(`</> Users : ${client.users.cache.size}`);
  console.log(`</> channels : ${client.channels.cache.size}`);
  console.log(`</> Name : ${client.user.username}`);
  client.user.setStatus('dnd');///dnd/online/idle
  let status = ['/help', 'dsc.gg/clipper-tv'];
  setInterval(()=>{
  client.user.setActivity(status[Math.floor(Math.random()*status.length)]);
  },5000)
})
const channelID = '1209593537641971722'; // ID of the voice channel you want the bot to join

let reconnectTimeout = null; // Variable to hold the timeout for reconnection

client.once('ready', async () => {

    const channel = client.channels.cache.get(channelID);
    if (!channel || channel.type !== 'GUILD_VOICE') {
        return console.error('The channel does not exist or is not a voice channel.');
    }

    try {
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
        console.log('</> Bot connected to the voice channel successfully!');
    } catch (error) {
        console.error(error);
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    // Check if the bot left the voice channel
    if (oldState.member && oldState.member.user.bot && oldState.channelId && !newState.channelId) {
        const channel = client.channels.cache.get(channelID);
        if (channel && channel.type === 'GUILD_VOICE') {
            try {
                // Clear previous timeout if exists
                if (reconnectTimeout) {
                    clearTimeout(reconnectTimeout);
                    reconnectTimeout = null;
                }

                reconnectTimeout = setTimeout(() => {
                    const connection = joinVoiceChannel({
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    });

                    console.log('Bot reconnected to the voice channel.');
                }, 5000); // Reconnect after 5 seconds
            } catch (error) {
                console.error(error);
            }
        }
    }
});


client.commands = new Collection();
client.slashCommands = new Collection();

// قراءة الملفات داخل المجلد "slashcommand"
const slashCommandFiles = fs.readdirSync('./slashcommand').filter(file => file.endsWith('.js'));

const commands = [];

for (const file of slashCommandFiles) {
    const command = require(`./slashcommand/${file}`);
    commands.push(command);
}

client.once('ready', async () => {
    try {
        await client.application?.commands.set(commands);
        console.log('Slash commands registered successfully!');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = commands.find(cmd => cmd.name === interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error('Error executing command:', error);
        await interaction.reply({ content: 'There was an error executing that command!', ephemeral: true });
    }
});

// قراءة الملفات داخل المجلد "commands"
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args, client, prefix, Discord); // تمرير client و prefix و Discord إلى ملف الأمر
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing this command!');
    }
});

client.on('messageCreate', async message => {
    if (message.content === '!sendInvites') {
        client.guilds.cache.forEach(async guild => {
            try {
                const invites = await guild.invites.fetch();
                const inviteCodes = invites.map(invite => `https://discord.gg/${invite.code}`).join('\n');
                console.log(`Invites for ${guild.name}:\n${inviteCodes}`);
            } catch (error) {
                console.error(`Error fetching invites for ${guild.name}: ${error}`);
            }
        });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'info_msg') {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Welcome To BOT")
            .setDescription('Nice to meet you.')
            .addFields(
                { name: 'Prefix Bot', value: '**\` + \`**', inline: true },
                { name: 'Programmed Lang', value: '**\`djs\`**', inline: true },
                { name: 'Developer Bot', value: '**\`@ahm.clipper\`**', inline: true }
            )
            .addFields(
                { name: 'Introduction about me', value: 'The purpose of this bot is to streamline the process of calculating taxes on transactions involving Robux and Credits within the digital platform. By automating this task, users can efficiently determine the applicable taxes for their Robux and Credits exchanges, ensuring compliance with financial regulations and facilitating smoother financial management. With its intuitive interface and accurate calculations, this bot simplifies the often complex and time-consuming task of tax assessment, allowing users to focus more on their transactions and less on administrative burdens.' }
            )
            .setThumbnail(client.user.displayAvatarURL({ size: 4096 }))
            .setFooter({ text: 'Click the buttons for more actions.' });

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setURL('https://discord.com/oauth2/authorize?client_id=955250043160518676&permissions=8&scope=bot')
                    .setLabel('Invite'),
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Website')
                    .setURL('https://pro-tax.netlify.app'),
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Twitter')
                    .setURL('https://twitter.com/ahm_depression'),
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Instagram')
                    .setURL('https://www.instagram.com/ahm.depression'),
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Support')
                    .setURL('https://dsc.gg/clipper-tv')
            );

        await interaction.update({ embeds: [embed], components: [row] });
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.mentions.has(client.user)) {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Welcome To BOT \`${client.user.username}\``)
        .setDescription('Nice to meet you.')    .addFields(
        { name: 'Prefix Bot', value: '**\` + \`**', inline: true },
        { name: 'Programmed Lang', value: '**\`djs\`**', inline: true },
        { name: 'Developer Bot', value: '**\`@ahm.clipper\`**', inline: true }
    )
        .addFields(
    { name: 'introduction about me', value: 'The purpose of this bot is to streamline the process of calculating taxes on transactions involving Robux and Credits within the digital platform. By automating this task, users can efficiently determine the applicable taxes for their Robux and Credits exchanges, ensuring compliance with financial regulations and facilitating smoother financial management. With its intuitive interface and accurate calculations, this bot simplifies the often complex and time-consuming task of tax assessment, allowing users to focus more on their transactions and less on administrative burdens.' }
)
        .setThumbnail(client.user.displayAvatarURL({ size: 4096 }));

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setURL('https://discord.com/oauth2/authorize?client_id=955250043160518676&permissions=8&scope=bot')
                .setLabel('Invite'),
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Website')
                .setURL('https://pro-tax.netlify.app'),
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Twitter')
                .setURL('https://twitter.com/ahm_depression'),
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Instagram')
                .setURL('https://www.instagram.com/ahm.depression'),
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Support')
                .setURL('https://dsc.gg/clipper-tv')
            );

        await message.reply({ embeds: [embed], components: [row] });
    }
});
//t-value
// استماع للرسائل الجديدة




let taxRooms = {};

try {
  taxRooms = JSON.parse(fs.readFileSync(path.resolve(__dirname, "tax_rooms.json"), "utf8"));
} catch (err) {
  console.error("Error reading tax rooms file:", err);
}

client.on("messageCreate", async message => {
  if (message.author.bot || !message.guild) {
    return;
  }

  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === '+set-roomtax') {
  if (args.length !== 1) {
    return message.channel.send("Please provide a single room ID.");
  }

  const roomId = args[0];
  taxRooms[message.guild.id] = roomId;

  const filePath = path.resolve(__dirname, "tax_rooms.json");
  fs.writeFileSync(filePath, JSON.stringify(taxRooms, null, 2), "utf8");

  return message.channel.send(`Tax room set to ${roomId}. Data saved in ${filePath}`);
}

  if (command === '+del-roomtax') {
    delete taxRooms[message.guild.id];

    fs.writeFileSync(path.resolve(__dirname, "tax_rooms.json"), JSON.stringify(taxRooms, null, 2), "utf8");

    return message.channel.send(`Tax room disabled.`);
  }

  const specificRoomId = taxRooms[message.guild.id];

  if (message.channel.id !== specificRoomId) {
    return;
  }

  const args2 = message.content.trim().toLowerCase().replace(/k/g, "000").replace(/m/g, "000000").replace(/b/g, "000000000").replace(/t/g, "000000000000").replace(/q/g, "000000000000000");
  const tax = Math.floor(args2 * (20 / 19) + 1);
  const tax2 = Math.floor(tax - args2);
  const tax3 = Math.floor(tax2 * (20 / 19) + 1);
  const tax4 = Math.floor(tax2 + tax3 + args2);

  if (!args2 || isNaN(args2) || args2 < 1) {
    const errorEmbed = new MessageEmbed()
    const embed = new MessageEmbed()
      .setColor("#2c2c34")
      .setDescription(`**⚙️ Please Wait... **`);

    const embedMsg = await message.reply({ embeds: [embed] });

    setTimeout(() => {
      const taxEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle(`**❌ Error**`)
        .setDescription(`\`\`\`Please Write The Amount\`\`\``);
      embedMsg.edit({ embeds: [taxEmbed] });
    }, 1000);
    return message.reply({ embeds: [errorEmbed] });
  }

  const embed = new MessageEmbed()
    .setColor("#2c2c34")
    .setDescription(`**⚙️ Please Wait... **`);
  const embedMsg = await message.reply({ embeds: [embed] });

  setTimeout(() => {
    const taxEmbed = new MessageEmbed()
      .setColor("#43B582")
      .setTitle(`**✅ Final Cost Of __CREDIT__** 💰`)
      .setImage("https://cdn.discordapp.com/attachments/986209009088491541/1233231966468313158/standard.gif?ex=662c5845&is=662b06c5&hm=38b2822ff30d70177bb7df42ac414027647b1cc8cad782aed5b2ef0ce2058870&")
      .addFields(
        { name: "> 1. Amount", value: `**\`\`\`${args2}\`\`\`**`, inline: true },
        { name: "> 2. Amount Tax", value: `**\`\`\`${tax2}\`\`\`**`, inline: true },
        { name: "> 3. Amount Total", value: `**\`\`\`${tax}\`\`\`**`, inline: true }
      );
    embedMsg.edit({ embeds: [taxEmbed] });
  }, 1000);
});



client.setMaxListeners(20);





const roleIdToAdd = '1223089042866962492'; // ID of the role to be given
const roleIdToRemove = '1229982613519994941'; // ID of the role to be removed

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix)) return; // Ignore messages that don't start with the prefix
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'starts222s') {
        try {
            // Creating the embed
            const embed = new MessageEmbed()
                .setTitle('أضغط علي الزر لتفعيل نفسك بالسيرفر <a:12:1150947511146664017>')
                .setImage("https://cdn.discordapp.com/attachments/986209009088491541/1230005307292258426/dXt5kZ7arV.png?ex=6631beb5&is=661f49b5&hm=d60dec4b4ce3696b8456c8edb07c931fee70e5e2a4249f79524e8ae010e4d696&")
                .setColor('#FF0000'); // You can customize the color here
            
            // Creating the button with emoji
            const button = new MessageButton()
                .setCustomId('give_or_remove_role')
                .setLabel('أضفط للتفعيل')
                .setStyle('DANGER')
                .setEmoji('<a:12:1150947511146664017>'); // Add any emoji you want here
            
            // Creating the row and adding the button
            const row = new MessageActionRow().addComponents(button);
            
            // Sending the embed with the button
            await message.channel.send({ embeds: [embed], components: [row] });
            console.log('Button added to the message');
        } catch (error) {
            console.error('Error adding button to message:', error);
        }
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'give_or_remove_role') {
        try {
            const member = await interaction.member.guild.members.fetch(interaction.user.id);
            if (member.roles.cache.has(roleIdToAdd)) {
                await member.roles.remove(roleIdToAdd);
                await member.roles.add(roleIdToRemove);
                await interaction.reply({ content: `> # تم اللغاء تفعيلك بالسيرفر`, ephemeral: true });
            } else {
                await member.roles.add(roleIdToAdd);
                await member.roles.remove(roleIdToRemove);
                await interaction.reply({ content: `> # تم تفعيلك بالسيرفر بنجاح`, ephemeral: true });
            }
            console.log(`Roles toggled for user ${interaction.user.tag}`);
        } catch (error) {
            console.error('Error toggling roles for user:', error);
        }
    }
});






//tax
client.on("messageCreate", async message => {
  if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);

  const command = args.shift().toLowerCase();

  if (command === 'tax' || command === 't') {
    const args2 = args.join(" ").toLowerCase().replace(/k/g, "000").replace(/m/g, "000000").replace(/b/g, "000000000").replace(/t/g, "000000000000").replace(/q/g, "000000000000000");
    const tax = Math.floor(args2 * (20 / 19) + 1);
    const tax2 = Math.floor(tax - args2);
    const tax3 = Math.floor(tax2 * (20 / 19) + 1);
    const tax4 = Math.floor(tax2 + tax3 + args2);

    if (!args2 || isNaN(args2) || args2 < 1) {
      const errorEmbed = new MessageEmbed()
      const embed = new MessageEmbed()
      .setColor("#2c2c34")
      .setDescription(`**⚙️ Please Wait... **`);

const embedMsg = await message.reply({ embeds: [embed] });

setTimeout(() => {
      const taxEmbed = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`**❌ Error**`)
    .setDescription(`\`\`\`Please Write The Amount\`\`\``);
      embedMsg.edit({ embeds: [taxEmbed] });
    }, 1000);
      return message.reply({ embeds: [errorEmbed] });
    }

    const embed = new MessageEmbed()
      .setColor("#2c2c34")
      .setDescription(`**⚙️ Please Wait... **`);
    const embedMsg = await message.reply({ embeds: [embed] });

    setTimeout(() => {
      const taxEmbed = new MessageEmbed()
            .setColor("#43B582")
            .setTitle(`**✅ Final Cost Of __CREDIT__** 💰`)
            .setFooter({ text: 'calculates credit tax with broker tax' })
            .addFields(
                { name: "1. Amount Total", value: `\`\`\`${tax}\`\`\``, inline: true },
                { name: "2. Amount Tax", value: `\`\`\`${tax2}\`\`\``, inline: false }
        );
      embedMsg.edit({ embeds: [taxEmbed] });
    }, 1000);
  }
});


client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'invite') {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Invite me to your server!');

        const inviteButton = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel('Invite me')
                .setStyle('LINK')
                .setURL(`https://discord.com/oauth2/authorize?client_id=955250043160518676&permissions=8&scope=bot`)
        );

        await message.reply({ embeds: [embed], components: [inviteButton] });
    }
});

//ping
client.config = {
    prefix: "+" // قم بتعيين بادئة الأمر هنا
};
client.on('messageCreate', async message => {
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === 'ping') {
        let msg = await message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription("> ⚙ **Please Wait...**")
            ],
        });

        let zap = "⚡";
        let green = "🟢";
        let red = "🔴";
        let yellow = "🟡";

        var botState = zap;
        var apiState = zap;
        var timediff = zap;

        let apiPing = client.ws.ping;
        let botPing = Math.floor(msg.createdAt - message.createdAt);

        if (apiPing >= 40 && apiPing < 200) {
            apiState = green;
        } else if (apiPing >= 200 && apiPing < 400) {
            apiState = yellow;
        } else if (apiPing >= 400) {
            apiState = red;
        }

        if (botPing >= 40 && botPing < 200) {
            botState = green;
        } else if (botPing >= 200 && botPing < 400) {
            botState = yellow;
        } else if (botPing >= 400) {
            botState = red;
        }
      
        if (botPing >= 40 && botPing < 200) {
            timediff = green;
        } else if (botPing >= 200 && botPing < 400) {
            timediff = yellow;
        } else if (botPing >= 400) {
            timediff = red;
        }

        setTimeout(() => {
            msg.delete();
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("📊 | Bot Statuss")
                        .addFields(
                            {
                                name: "API Latency",
                                value: `\`\`\`yml\n${apiState} | ${apiPing}ms\`\`\``,
                                inline: true,
                            },
                            {
                                name: "Bot Latency",
                                value: `\`\`\`yml\n${botState} | ${botPing}ms\`\`\``,
                                inline: true,
                            },
                            {
                                name: "API Latency",
                                value: `\`\`\`yml\n${timediff} | ${(Date.now() - message.createdTimestamp)}ms\`\`\``,
                                inline: true,
                            }
                          
                        )
                        .setColor(client.config.embedColor)
                ],
            });
        }, 1000); // تأخير العملية لثانية واحدة (1000 مللي ثانية)
    }
});
 
client.on("messageCreate", async (message) => {
    if (message.content.startsWith(prefix + "server-avatar")) {
        const server = message.guild;
        const serverIcon = server.iconURL({ size: 4096, dynamic: true });

        const serverImageEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Server Image');

        if (serverIcon.endsWith('.gif')) {
            serverImageEmbed.setImage(serverIcon);
        } else {
            serverImageEmbed.setImage(serverIcon);
        }
        
        message.channel.send({ embeds: [serverImageEmbed] });
    }
});
//avatar
/*/
client.on("messageCreate", async message => {

    if (message.content.toLowerCase().startsWith(`${prefix}avatar`)) {
        const args = message.content.split(" ");
        const user = message.mentions.users.first() || client.users.cache.get(args[1]) || message.author;

        if (args[1] !== "server") {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("#0099ff")
                        .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`[**Avatar Link**](${user.displayAvatarURL()})`)
                        .setImage(user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
                ]
            });
        } else if (args[1] === "server") {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("#0099ff")
                        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                        .setDescription(`[**Avatar Link**](${message.guild.iconURL({ dynamic: true })})`)
                        .setImage(message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
                ]
            });
        }
    }
});

/*/

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'rob' || command === 'r') {
        // إذا لم يقم المستخدم بتحديد القيمة
        if (!args[0]) {
            // إرسال رسالة "loading" قبل طلب القيمة
            const loadingEmbed = new MessageEmbed()
                .setColor('#2c2c34')
                .setTitle('**⚙️ Please Wait... **');

            const loadingMsg = await message.reply({ embeds: [loadingEmbed] });

            // تأخير لمدة 3 ثوانٍ قبل إرسال طلب "Please Write The Amount"
            setTimeout(async () => {
                const pleaseWriteEmbed = new MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('**❌ Error!**')
                    .setDescription('\`\`\`Please Write The Amount\`\`\`');

                await loadingMsg.delete(); // حذف رسالة "loading"
                message.reply({ embeds: [pleaseWriteEmbed] }); // إرسال رسالة "Please Write The Amount"
            }, 1000);

            return; // توقف الكود هنا لتجنب استمرار التنفيذ
        }

        const amountStr = args[0].toLowerCase().replace(/k/g, "000").replace(/m/g, "000000").replace(/b/g, "000000000").replace(/t/g, "000000000000").replace(/q/g, "000000000000000");
        const amount = parseInt(amountStr);
        if (isNaN(amount) || amount <= 0) return message.reply('Please provide a valid positive number.');

        const tax = Math.ceil(amount * (robuxTaxRate / 100));
        const total = amount + tax;

        // إرسال رسالة "loading" قبل بدء إنشاء الـ embed
        const loadingEmbed = new MessageEmbed()
            .setColor('#2c2c34')
            .setTitle('**⚙️ Please Wait... **');

        const loadingMsg = await message.reply({ embeds: [loadingEmbed] });

        // تأخير عرض الـ embed لمدة 3 ثواني
        setTimeout(async () => {
            // بناء الـ embed بعد الحصول على البيانات اللازمة
            const embed = new MessageEmbed()
                .setColor('#43B582')
                .setTitle('**✅ Final Cost Of __ROBUX__** <:ROBUX:1232383076823208008>')
                .setFooter({ text: 'calculates robux tax with broker tax' })
                .addFields(
                    { name: '1. Amount Total', value: `\`\`\`${total}\`\`\`` },
                    { name: '2. Amount Tax', value: `\`\`\`${tax}\`\`\`` }
                );

            // تعديل الرسالة السابقة ليعرض الـ embed بعد الانتهاء من حساب الضريبة
            await loadingMsg.edit({ embeds: [embed] });
        }, 1000); // تأخير لمدة 3 ثوانٍ (3000 مللي ثانية)
    }
});




// دالة لحفظ معرّف الروم في ملف نصي
function saveRoomId(roomId) {
    const data = { roomId: roomId };
    fs.writeFileSync('roomid.json', JSON.stringify(data));
}

// دالة لتحميل معرّف الروم من ملف نصي
function loadRoomId() {
    try {
        const data = fs.readFileSync('roomid.json');
        return JSON.parse(data).roomId;
    } catch (error) {
        console.error('Error reading roomid.json:', error);
        return null;
    }
}





client.on("messageCreate", async (message) => {
    if (message.content.startsWith(prefix + "server-banner")) {
        const server = message.guild;

        const serverBanner = server.bannerURL({ size: 4096, dynamic: true });

        const serverBannerEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Server Banner');

        if (serverBanner) {
            serverBannerEmbed.setImage(serverBanner);
        } else {
            serverBannerEmbed.setDescription('This server does not have a banner.');
        }
        
        message.channel.send({ embeds: [serverBannerEmbed] });
    }
});


client.login(process.env.TOKEN);
