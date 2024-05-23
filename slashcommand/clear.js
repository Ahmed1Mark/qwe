const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'clear',
    description: 'Clear a certain number of messages.',
    options: [
        {
            name: 'amount',
            description: 'The number of messages to clear.',
            type: 'INTEGER',
            required: true
        }
    ],
    execute(interaction) {
        // Check if the user has permission to manage messages
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        // Get the number of messages to delete from the user's input
        const amount = interaction.options.getInteger('amount');

        // Check if the amount is a valid number
        if (isNaN(amount) || amount < 1 || amount > 100) {
            return interaction.reply({ content: 'Please provide a number between 1 and 100.', ephemeral: true });
        }

        const duration = moment.duration(interaction.client.uptime).format(" D[d], H[h], m[m]");

        try {
            // Delete the specified number of messages
            interaction.channel.bulkDelete(amount + 1) // +1 to also delete the command message
                .then(messages => {
                    const embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`Cleared Messages`)
                        .setDescription(`Successfully deleted ${messages.size - 1} messages.`)
                        .setFooter({ text: `Requested by ${interaction.user.tag}` })
                        .setTimestamp();

                    interaction.reply({ embeds: [embed], ephemeral: true });
                })
                .catch(error => {
                    console.error('Error deleting messages:', error);
                    interaction.reply({ content: 'An error occurred while deleting messages.', ephemeral: true });
                });
        } catch (error) {
            console.error('Error deleting messages:', error);
            interaction.reply({ content: 'An error occurred while deleting messages.', ephemeral: true });
        }
    },
};
