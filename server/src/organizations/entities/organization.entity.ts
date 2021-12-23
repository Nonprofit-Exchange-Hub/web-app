import { AfterInsert, BeforeInsert, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  website: string;

  @Column('text')
  address: string;

  @Column('text')
  phone: string;

  @Column('text')
  city: string;

  @Column('text')
  state: string;

  @Column({type:'int', unique: true})
  // validator from api might go here
  // why does it skip the id if it doesn't work
  ein: number;

  @Column('int')
  tax_exempt_id: number;

  @AfterInsert()
  logInsert(){
    console.log("inserted Org", this.id)
  }

  @BeforeInsert()
  checkAPI(){
    console.log("checking the API", this.name, this.ein)
    
  }
}
