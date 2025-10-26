import asyncio
from playwright.async_api import async_playwright, TimeoutError as PWTimeout

EXT_ID = "fcfhplploccackoneaefokcmbjfbkenj"
EXT_VERSION = "2.0.22_0"
EXT_PATH = rf"C:/Users/code80/AppData/Local/Google/Chrome/User Data/Default/Extensions/{EXT_ID}/{EXT_VERSION}"
USER_DATA_DIR = r"C:/Users/code80/Desktop/chat-persona/backend/parser/data"

async def try_enable_vpn(page):
    possible_selectors = [
        "button#connect",
        "button.connect",
        "button",
        "text=Connect",
        "text=Подключить",
    ]

    for sel in possible_selectors:
        try:
            await page.wait_for_selector(sel, timeout=5000)
            await page.click(sel)
            print(f"[+] Clicked selector: {sel}")
            return True
        except PWTimeout:
            print(f"[-] Selector not found / timeout: {sel}")
        except Exception as e:
            print(f"[-] Click failed for {sel}: {e}")
    return False

async def main():
    async with async_playwright() as play:
        context = await play.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=False,
            args=[
                f"--disable-extensions-except={EXT_PATH}",
                f"--load-extension={EXT_PATH}",
            ],
        )

        try:
            popup_url = f"chrome-extension://{EXT_ID}/popup.html"
            page = await context.new_page()
            print("[*] Opening extension popup:", popup_url)
            await page.goto(popup_url, wait_until="domcontentloaded", timeout=20000)
        except Exception as e:
            print("[!] Could not open popup.html directly:", e)
            pages = context.pages
            print("[*] Current pages in context:", [p.url for p in pages])
            page = page[0] if pages else await context.new_page()


        ok = await try_enable_vpn(page)
        
        if not ok:
            print("[!] Не удалось нажать Connect автоматически. Проверь селекторы или включай VPN вручную.")
        else:
            print("[*] Подождём 5–8 секунд на установку VPN...")
            await page.wait_for_timeout(8000)
        
        sc_page = await context.new_page()

        try:
            await sc_page.page.goto("https://soundcloud.com/discover", wait_until="networkidle", timout=60000)
            print("[+] SoundCloud opened, title:", await sc_page.title())
        except Exception as e:
            print("[!] Ошибка при открытии SoundCloud:", e)
            print("[*] Попробуй открыть вручную в том же профиле, чтобы понять, включился ли VPN.")
        finally:
            await asyncio.sleep(10)
            await context.close()

if __name__ == "__main__":
    asyncio.run(main())
