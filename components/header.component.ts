import { Locator, Page } from "@playwright/test";

export class HeaderComponent {
  readonly root: Locator;

  readonly logoLink: Locator;
  readonly monitoringLink: Locator;
  readonly historyLink: Locator;
  readonly tasksLink: Locator;

  readonly handbooksMenuItem: Locator;
  readonly handbooksTrigger: Locator;
  readonly handbooksDropdown: Locator;
  readonly handbookLinks: Locator;

  readonly notificationButton: Locator;
  readonly notificationBadge: Locator;

  readonly userMenuTrigger: Locator;
  readonly userName: Locator;
  readonly organizationCount: Locator;

  constructor(private readonly page: Page) {
    this.root = page.locator("app-navbar");

    this.logoLink = this.root.locator(".main_logo").getByRole("link");

    const mainNavigation = this.root.locator("#main-menu-navigation");

    this.monitoringLink = mainNavigation.getByRole("link", {
      name: "Мониторинг",
      exact: true,
    });

    this.historyLink = mainNavigation.getByRole("link", {
      name: "История",
      exact: true,
    });

    this.tasksLink = mainNavigation.getByRole("link", {
      name: "Задачи",
      exact: true,
    });

    this.handbooksMenuItem = this.root
      .locator("#main-menu-navigation > li")
      .filter({ hasText: "Справочники" });

    this.handbooksTrigger = this.handbooksMenuItem.getByText("Справочники", {
      exact: true,
    });

    this.handbooksDropdown = this.handbooksMenuItem.locator("ul.dropdown-menu");

    this.handbookLinks = this.handbooksDropdown.getByRole("link");

    this.notificationButton = this.root.locator("#drp-notification");

    this.notificationBadge = this.root.locator(".notification-badge");

    this.userMenuTrigger = this.root.locator("#dropdownBasic2");

    this.userName = this.root.locator(".org-trigger-user-name");

    this.organizationCount = this.root.locator(".org-count-number");
  }

  async openHandbooksMenu() {
    await this.handbooksTrigger.hover();
  }

  handbookLink(name: string): Locator {
    return this.handbooksDropdown.getByRole("link", {
      name,
      exact: true,
    });
  }
}
