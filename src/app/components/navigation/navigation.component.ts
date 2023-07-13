import {
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { Component } from '@angular/core';

export interface ILink {
  label: string;
  href: string;
  icon: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  private links: ILink[] = [
    {
      href: '/',
      label: 'Home',
      icon: 'home',
    },
    {
      href: '/create-user',
      label: 'Add User',
      icon: 'add',
    },
    {
      href: '/update-user-credential',
      label: 'Modify User Credential',
      icon: 'edit',
    },
    {
      href: '/account',
      label: 'Account',
      icon: 'person',
    },
  ];
  get getLinks() {
    return this.links;
  }

  setColor(label: string): 'accent' | 'primary' {
    return label.toLowerCase() === 'account'
      ? 'accent'
      : 'primary';
  }
}
