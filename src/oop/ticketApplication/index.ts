/**
 * 주인공: Theater, TicketSeller, TicketOffice, Ticket, Audience, Bag
 */

interface Ticket {
  fee: number;
}

class Invitation {
  constructor(private when: Date) {}
}

class TicketOffice {
  constructor(private tickets: Ticket[]) {}

  public getTicket() {
    return this.tickets.pop();
  }
}

class Bag {
  constructor(
    private amount: number,
    private invitation: Invitation,
    private ticket: Ticket | null
  ) {}

  public hold(ticket: Ticket) {
    if (this.hasInvitation()) {
      this.setTicket(ticket);
      return;
    }

    this.minusAmount(ticket.fee);
    this.setTicket(ticket);
  }

  private hasInvitation() {
    return this.invitation !== null;
  }

  private setTicket(ticket: Ticket) {
    this.ticket = ticket;
  }

  private minusAmount(amount: number) {
    this.amount -= amount;
  }
}

class Audience {
  constructor(private bag: Bag) {}

  public buy(ticket: Ticket) {
    this.bag.hold(ticket);
  }
}

class TicketSeller {
  constructor(private ticketOffice: TicketOffice) {}

  public sellTo(audience: Audience) {
    const ticket = this.ticketOffice.getTicket();
    if (!ticket) {
      console.log("티켓이 없습니다.");
      return;
    }

    audience.buy(ticket);
  }
}

class Theater {
  constructor(private ticketSeller: TicketSeller) {}

  public enter(audience: Audience) {
    this.ticketSeller.sellTo(audience);
  }
}

// 사용
const ticket = { fee: 10000 };
const ticketOffice = new TicketOffice([ticket]);
console.log("ticketOffice: ", ticketOffice);
const ticketSeller = new TicketSeller(ticketOffice);

const invitation = new Invitation(new Date());
const bag = new Bag(10000, invitation, null);
const audience = new Audience(bag);

const theater = new Theater(ticketSeller);
theater.enter(audience);

console.log(ticketOffice);
