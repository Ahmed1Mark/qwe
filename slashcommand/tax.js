const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'tax',
    description: 'Calculate tax on the entered amount.',
    options: [
        {
            name: 'amount',
            type: 'STRING',
            description: 'The amount to calculate tax for.',
            required: true,
        },
    ],
    async execute(interaction) {
        const amountString = interaction.options.getString('amount');
        const amount = parseInt(amountString.replace(/[^0-9]/g, ''), 10);

        const args2 = amountString.toLowerCase().replace(/k/g, "000").replace(/m/g, "000000").replace(/b/g, "000000000").replace(/t/g, "000000000000").replace(/q/g, "000000000000000");
        const tax = Math.floor(args2 * (20 / 19) + 1);
        const tax2 = Math.floor(tax - amount);
        const tax3 = Math.floor(tax2 * (20 / 19) + 1);
        const tax4 = Math.floor(tax2 + tax3 + amount);

        if (!amount || isNaN(amount) || amount < 1) {
            const errorEmbed = new MessageEmbed()
                .setColor("#FF0000")
                .setTitle(`**❌ Error**`)
                .setDescription(`\`\`\`Please enter a valid amount.\`\`\``);
            return interaction.reply({ embeds: [errorEmbed] });
        }

        const taxEmbed = new MessageEmbed()
            .setColor("#43B582")
            .setTitle(`**✅ Final Cost Of __CREDIT__** 💰`)
            .setFooter({ text: 'Calculates credit tax with broker tax' })
            .addFields(
        { name: "> 1. Amount", value: `**\`\`\`${args2}\`\`\`**`, inline: true },
        { name: "> 2. Amount Tax", value: `**\`\`\`${tax2}\`\`\`**`, inline: true },
        { name: "> 3. Amount Total", value: `**\`\`\`${tax}\`\`\`**`, inline: true }
            );
        return interaction.reply({ embeds: [taxEmbed] });
    },
};
