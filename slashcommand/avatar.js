const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Display the avatar of a user or the server.',
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'The user whose avatar you want to display.',
            required: false,
            // Add the USER_PERMISSION here if needed
            // USER_PERMISSION: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
        },
    ],
    async execute(interaction) {
        const userOption = interaction.options.get('user');
        const user = userOption ? userOption.user : interaction.user;

        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("#0099ff")
                    .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`[**Avatar Link**](${user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 })})`)
                    .setImage(user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }))
            ]
        });
    },
};
