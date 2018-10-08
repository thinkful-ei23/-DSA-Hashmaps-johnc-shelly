
function main(){
    const lotr = new Map()
    lotr.set('Hobbit','Bilbo');
    lotr.set('Hobbit','Frodo');
    lotr.set('Wizard','Gandolf');
    lotr.set('Human','Aragon');
    lotr.set('Elf','Legolas');
    lotr.set('Maiar','The Necromancer');
    lotr.set('Maiar','Sauron');
    lotr.set('RingBearer','Gollum');
    lotr.set('LadyofLight','Galadriel');
    lotr.set('HalfElven','Arwen');
    lotr.set('Ent','Treebeard');
    console.log(lotr.get('Maiar'))
}

main()