import discord
from discord.ext import commands
import os

# Load the bot token from environment variables
bot_token = os.environ.get('BOT_TOKEN')

# Create a bot instance with a command prefix
bot = commands.Bot(command_prefix='!')

# Event: Bot is ready
@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name}')
    print('Hello, Earth! I am ready to assist.')

# Command: Greet the user
@bot.command(name='hello', help='Greet the user')
async def hello(ctx):
    await ctx.send(f'Hello {ctx.author.mention}!')

# Command: Create a new role
@bot.command(name='createrole', help='Create a new role')
async def create_role(ctx, role_name):
    guild = ctx.guild
    await guild.create_role(name=role_name)
    await ctx.send(f'Role `{role_name}` created!')

# Command: Replace channel names
@bot.command(name='replacechannels', help='Replace channel names')
async def replace_channels(ctx):
    # Get all text channels in the server
    text_channels = [channel for channel in ctx.guild.channels if isinstance(channel, discord.TextChannel)]

    # Iterate through text channels and replace names
    for channel in text_channels:
        original_name = channel.name
        new_name = original_name.replace('🎉・', '🎉︱')
        await channel.edit(name=new_name)

    await ctx.send('Channel names replaced!')

# Run the bot with your token
bot.run(bot_token)
