// command/server.js
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'server',
    description: 'Display information about the server.',
    execute(message, args, prefix) {
        try {
            const command = 'server'; // اسم الأمر

            // التحقق مباشرةً من الأمر
            if (command === 'server' || command === 'معلومات') {
                const onlineMembers = message.guild.members.cache.filter(m => m.presence?.status === 'online' || m.presence?.status === 'dnd' || m.presence?.status === 'idle').size;
                const textChannels = message.guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT').size;
                const voiceChannels = message.guild.channels.cache.filter(ch => ch.type === 'GUILD_VOICE').size;
                const server = message.guild;

                const serverEmbed = new MessageEmbed()
                    .setColor('#2c2c34')
                    .setTimestamp()
                    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                    .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                    .addFields(
                        { name: '🆔 Server ID:', value: message.guild.id, inline: true },
                        { name: '📆 Created On:', value: message.guild.createdAt.toDateString(), inline: true },
                        { name: `👥 Members (${message.guild.memberCount})`, value: `${onlineMembers} online members\n${message.guild.premiumSubscriptionCount} boosts ✨`, inline: true },
                        { name: '💬 Channels:', value: `${textChannels} Text | ${voiceChannels} Voice`, inline: true },
                        { name: '🌍 Others:', value: `Region: ${message.guild.region}\nVerification Level: ${message.guild.verificationLevel}`, inline: true },
                        { name: `🔐 Roles (${message.guild.roles.cache.size})`, value: 'To see a list with all roles use ', inline: true }
                    )
                    .setThumbnail(message.guild.iconURL({ dynamic: true }));

                message.reply({ embeds: [serverEmbed] });
            }
        } catch (error) {
            console.error('حدث خطأ:', error);
        }
    },
};
