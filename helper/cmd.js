const commands =  {
    'help --{commandName}': "Alias for man command",
    'man': "shows help page",
    'stats': "gets stats of underlying os and resource utilization",
    'exit': "kill the cli and the rest of application",
    'list users': 'shows a list of all registered (undeleted) user',
    'more user info --{userId}': 'show details of the specific user',
    'list logs': 'show a list of all the log files available to be read (compressed only)',
    'url --{host, port, protocol} {url}' : 'shows host, port, protocol of url' 

}

module.exports ={
    commands
}