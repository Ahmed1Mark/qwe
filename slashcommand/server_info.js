const { MessageEmbed } = require('discord.js');

module.exports =     {
        name: 'server',
        description: 'Display information about the server.',
        async execute(interaction) {
            try {
                const command = 'server'; // اسم الأمر
        
                // التحقق مباشرةً من الأمر
                if (command === 'server' || command === 'معلومات') {
                    const onlineMembers = interaction.guild.members.cache.filter(m => m.presence?.status === 'online' || m.presence?.status === 'dnd' || m.presence?.status === 'idle').size;
                    const textChannels = interaction.guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT').size;
                    const voiceChannels = interaction.guild.channels.cache.filter(ch => ch.type === 'GUILD_VOICE').size;
                    const server = interaction.guild;
        
                    const serverEmbed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
                        .addFields(
                            { name: '🆔 Server ID:', value: interaction.guild.id, inline: true },
                            { name: '📆 Created On:', value: interaction.guild.createdAt.toDateString(), inline: true },
                            { name: `👥 Members (${interaction.guild.memberCount})`, value: `${onlineMembers} online members\n${interaction.guild.premiumSubscriptionCount} boosts ✨`, inline: true },
                            { name: '💬 Channels:', value: `${textChannels} Text | ${voiceChannels} Voice`, inline: true },
                            { name: '🌍 Others:', value: `Region: ${interaction.guild.region}\nVerification Level: ${interaction.guild.verificationLevel}`, inline: true },
                            { name: `🔐 Roles (${interaction.guild.roles.cache.size})`, value: 'To see a list with all roles use ', inline: true }
                        )
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 4096 }));
        
                    interaction.reply({ embeds: [serverEmbed] });
                }
            } catch (error) {
                console.error('حدث خطأ:', error);
            }
        },
    };
